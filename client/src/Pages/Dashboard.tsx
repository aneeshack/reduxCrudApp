import { useEffect, useState } from "react";
import axios from "../Axios/Axios";
import useDebounce from "../hooks/useDebounce";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/features/UserSlice";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { editUserValidationSchema } from "../FormValidation/EditUserAdminValidation";
import { AddUserAdminSchema } from "../FormValidation/AddUserAdminValidation";



type User = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
};

export interface AddUserFrom {
  name: string;
  email: string;
  password: string;
  confirmPassword:string
}

const Dashboard = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenAdd, setModalOpenAdd] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);


  const debounceValue = useDebounce(search, 500);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: AddUserFrom = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("searcha", debounceValue);
        
        const response = await axios.get(
          `/api/admin/fetchUserAdmin${
            debounceValue ? `?search=${debounceValue}` : ""
          }`
        );
        const { data } = response;
        console.log("data:", data);
        let userWithSearch: User[] = [];
        if (Array.isArray(data.data)) {
          userWithSearch = data.data.map((user: User, index: number) => ({
            ...user,
            id: index + 1,
          }));
        } else {
          console.error("Expected an array but received:", data);
        }
        setUserData(userWithSearch);
      } catch (error) {
        console.log("error in fetching data", error);
      }
    };
    fetchUser();
  }, [debounceValue]);
  const selectedUser = userData.find((user) => user?._id === editingUserId);


  const handleEdituser = async (value: any) => {
    console.log("hey working ",value);
    try {
      const response = await axios.post("/api/admin/editUser", {
        _id: editingUserId,
        ...value
      });
      // setModalOpen(false);
      if(response.data.success){
        const eidtuser = await axios.get("/api/admin/fetchUserAdmin");
        const { data } = eidtuser;
        let userAfterEdit: User[] = [];
        if (Array.isArray(data.data)) {
          userAfterEdit = data.data.map((user: User, index: number) => ({
            ...user,
            id: index + 1,
          }));
      
      console.log('edit user:',userAfterEdit)
      toast.success('success')
      setUserData(userAfterEdit)
      setModalOpen(false)

      }
    }else if(response.data.ErrorEdit){
        toast.error('Error in editing data')
      } else {
        console.error("Error showing the edituser side");
      }
      // setUserData(userAfterEdit);
      // console.log("🚀 ~ file: AdminDashboard.tsx:71 ~ handleEdituser ~ userAfterEdit:", userAfterEdit)
    } catch (err) {
      console.log(err);
    }
  };



  const handleAdduser = async (value: AddUserFrom) => {
    console.log("working", value);
    const response = await axios.post("/api/admin/addUserAdmin", value);
    if (response.data.success) {
      const newUser = await axios.get("/api/admin/fetchUserAdmin");
      const { data } = newUser;
      let userAfterAdd: User[] = [];

      if (Array.isArray(data.data)) {
        userAfterAdd = data.data.map((user: User, index: number) => ({
          ...user,
          id: index + 1,
        }));
      }
      console.log('fetch data:',userAfterAdd)
      toast.success("successfully");
      setUserData(userAfterAdd);
      setModalOpenAdd(false);
    } else if (response.data.CheckError) {
      toast.error("the mail already used");
      setModalOpenAdd(true);
    }
  };

  const handleDelete = async (_id: string) => {
    console.log("userid is:", _id);
    try {
      const userDetail = userData.find((item) => item._id === _id);
      const confirmDelete = window.confirm(
        `Are you sure to block/unblock ${userDetail?.name}`
      );
      if (!confirmDelete) return;
      const response = await axios.post("/api/admin/deleteUser", {
        data: userDetail?._id,
      });
      if (response.data.success) {
        const newUSer = await axios.get("/api/admin/fetchUserAdmin");
        const { data } = newUSer;

        let userAfterDelete: User[] = [];
        if (Array.isArray(data.data)) {
          userAfterDelete = data.data.map((user: User, index: number) => ({
            ...user,
            id: index + 1,
          }));
          toast.success("User Blocked");
          setUserData(userAfterDelete);
        }
      }
    } catch (error) {
      console.log("error in delete:", error);
    }
  };

  const handleLogout = async () => {
    try {
      console.log("admin logout");
      const response = await axios.post("/api/admin/logout");
      console.log("logout response", response.data);
      dispatch(logout());
      navigate("/logout");
    } catch (error) {
      console.log("mistake in logout", error);
    }
  };
  return (
    <div className="bg-blue-50 h-screen">
      {/* navbar */}
      <div className="h-14  bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
        <ul className="flex justify-between items-center mx-8 p-2 ">
          <li className="text-3xl font-bold ">Dashboard</li>
          <input
            type="text"
            placeholder="Search..."
            className=" w-1/2 px-9 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-violet-800"
            onChange={(e) => setSearch(e.target.value)}
          />
          <li
            className="text-xl text-cyan-300 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* table */}
      
      <div className=" m-40  w-3/4 ">
        <div className="flex items-center justify-between"> 
        
        <h1 className="font-bold text-3xl m-10  text-violet-950">USER  INFORMATION</h1>
        
          <button
            className="bg-sky-500  hover:bg-gradient-to-r from-sky-700 to-indigo-900 text-white px-4 py-2 mr-10 rounded hover:bg-green-600"
            onClick={() => setModalOpenAdd(true)}
          >
            Create
          </button>
        </div>
        <table className="bg-sky-100 table-fixed w-full overflow-hidden">
          <thead className="bg-gradient-to-r from-indigo-500 to-sky-500 h-12 text-xl ">
            <tr>
              <th>UserName</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.length > 0 ? (
              userData.map((user: any,) => (
                <tr key={user._id} className="border-b border-sky-200">
                  <td className="px-16">{user.name} </td>
                  <td className="px-16"> {user.email}</td>
                  <td className="px-16"> {user.phone}</td>
                  <td className="px-3 border-b border-gray-200 flex items-center">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-gradient-to-r from-sky-700 to-indigo-900"
                      onClick={() => {
                        setEditingUserId(user._id);
                        setModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    {user.status == "Active" ? (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-gradient-to-r from-blue-400 to-violet-900"
                        onClick={() => {
                          handleDelete(user._id);
                        }}
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-gradient-to-r from-red-900 to-indigo-900"
                        onClick={() => {
                          handleDelete(user._id);
                        }}
                      >
                        Unblock
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Edit User</h2>
            <Formik
              initialValues={{
                name: selectedUser?.name,
                email: selectedUser?.email,
              }}
              validationSchema={editUserValidationSchema}
              onSubmit={handleEdituser}
            >
              <Form>
                <div className="mb-4">
                  <label className="block text-gray-700">name</label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border rounded-lg"
                    
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
           
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
      {isModalOpenAdd && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add User</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={AddUserAdminSchema}
              onSubmit={handleAdduser}
            >
              <Form>
                <div className="mb-4">
                  <label className="block text-gray-700">name</label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">password</label>
                  <Field
                    type="password"
                    name="password"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">ConfirmPassword</label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                {/* <div className="mb-4">
                  <label className="block text-gray-700">Bio</label>
                  <Field
                    as="textarea"
                    name="bio"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div> */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                    onClick={() => setModalOpenAdd(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
