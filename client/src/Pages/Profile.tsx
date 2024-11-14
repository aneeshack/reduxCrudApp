import  { useEffect, useState } from "react";
import Navbar from "../components/UserNavbar";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Redux/features/UserSlice";
import axios from "../Axios/Axios";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import defaultImage from '../assets/profile_image.avif'
import { editProfileValidationSchema } from "../FormValidation/ProfileValidation";
import { CustomImageFileInput } from "../components/ImageField";
import { ImageUpload } from "../utilsCloudinary/ImageUpload";


interface fromType {
  name: string;
  email: string;
  image?: string | null;
  phone: string;
}

const Profile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.UserData.userData);
  const [ image, setImage] = useState<string | null >(null);
  // const userDetailFetch = useSelector((state: any) => state.UserData.userData.name);

  // const profileImage = userData.image? userData.image: defaultImage;
  // let profileImage = userData.image? userData.image: defaultImage;

  useEffect(() => {
    if (userData) {
      setUserData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      });
      setImage(userData.image || defaultImage);
    }
  }, [userData]);

  const handleEditForm = async(value:fromType, image:string |null)=>{
  // const handleEditForm = async (value: fromType) => {
    try {
      const formData = {
        _id:userData._id,
        name: value.name,
        email: value.email,
        phone: value.phone,
        image:image
      };
      console.log("form data", formData);

      const PostEditProfile = await axios.post("/api/editProfile", formData);
      if (PostEditProfile.data.success) {
        const userGetData = await axios.get("/api/fetchUserData");

        toast.success("Profile Edited Successfully.");
        dispatch(setUserData(userGetData.data));
      } else {
        toast.error("Error in Editing");
      }
    } catch (error) {
      console.log("errors :", error);
    }
  };

  const handleDelete = async (value: string) => {
    try {
      console.log(value, "this is the id");
      const deleteImg = await axios.post("/api/deleteImage", { id: value });
      if (deleteImg.data.success) {
        const userAfter = await axios.get("/api/fetchUserData");
        toast.success("Deleted successfully");
        dispatch(setUserData(userAfter.data));
      } else if(deleteImg.data.ErrorDelete) {
        toast.error("Something wrong");
      }else{
        toast.error('error in deleting')
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  console.log(image, "kokoo");

  const handleImageChange = (file: string | File | null) => {
    if (typeof file === "string" || file === null) {
      setImage(file);
    } else {
      console.error("Received unexpected file type:", file);
    }
  };
  console.log(image, "kokoo");
 
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
        <div className="bg-violet-200 p-6 rounded-lg shadow-lg w-full max-w-md">
          {/* Profile Image Container */}
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300">
              <img
                src={image||defaultImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* User Information */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Name:{userData?.name}
            </h2>
  
             <CustomImageFileInput onChange={handleImageChange} />
      {/* <CustomImageFileInput /> */}
          <h1
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleDelete(userData._id)}
          >
            Delete Image
          </h1>
            {/* <p className="text-gray-600">Aneesha</p> */}
          </div>
          <Formik
            initialValues={{
              name: userData.name,
              email: userData.email,
              phone: userData?.phone,
            }}
            validationSchema={editProfileValidationSchema}
            onSubmit={(values) => handleEditForm(values,image)}
          >
            {({isSubmitting}) => ( 
            <Form className="flex flex-col items-center">
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">Name:</span>
                  <Field
                    className="text-black p-2 w-full rounded-md text-xl"
                    name="name"
                    type="text"
                    
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component='div'
                  className="text-red-600 text-sm"/>
              </div>
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">Email:</span>
                  <Field
                    className="ttext-black p-2 w-full rounded-md text-xl "
                    name="email"
                    type="email"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component='div'
                  className="text-red-600 text-sm"/>
              </div>
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-gray-800">Phone:</span>
                  <Field
                    className="text-black p-2 w-full rounded-md text-xl ml-2"
                    name="phone"
                    type="text"
                  />
                </div>
                <ErrorMessage
                  name="phone"
                  component='div'
                  className="text-red-600 text-sm"/>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded mt-2"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
            )}
          </Formik>
        </div>
      </div>
     
    </>
  );
};

export default Profile;
