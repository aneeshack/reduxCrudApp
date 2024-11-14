import axios from "../Axios/Axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import signupValidation from "../FormValidation/SignupValidation";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/features/UserSlice";

interface singupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: singupData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const formSubmit = async (userData: singupData) => {
    try {
    
      console.log(userData);
      setLoading(true);

      const response = await axios.post("/api/register", userData);
      console.log("response", response.data);

      if (response.data.success) {
        console.log("success");
        toast.success("signup successfully");

        const FetchUserData = await axios.get('/api/fetchUserData')
        if(FetchUserData){
          console.log('',FetchUserData)
        dispatch(setUserData(FetchUserData.data));
        navigate('/home');
        }else{
          toast.error('Session expiered.Please login again.')
          navigate('/login')
        }
           
        setTimeout(() => {
          setLoading(false);
        }, 2000);

      } else {
        toast.error("Unexpected Error");
      }
    } catch (error) {
      console.log(error);
      toast.error('something went wrong. Please try again.')
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex justify-center  items-center h-screen bg-[url('download2.jpg')] bg-cover ">
      <div className=" bg-opacity-15  border-2 hover:ring-8 hover:ring-red-700 hover:border-none  bg-gray-900 h-3/4 w-1/4 min-w-96 rounded-md text-white ">
        <h1 className="flex justify-center text-3xl font-bold p-16">Signup</h1>
      
        <Formik 
        initialValues={initialValues} 
        validationSchema={signupValidation}
        onSubmit={formSubmit}>
          <Form>
            <div className="flex flex-col gap-2 m-7 ">
              <Field
                name="name"
                type="text"
                className="rounded-sm p-2 bg-transparent border border-red-700  text-white  font-semibold placeholder:text-white"
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component='div' className="text-red-500 text-sm"/>
              <Field
                type="email"
                name="email"
                className="rounded-sm p-2 bg-transparent border border-red-700 text-white font-semibold placeholder:text-white"
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component='div' className="text-red-500 text-sm"/>
              <Field
                type="password"
                name="password"
                className="rounded-sm p-2 bg-transparent border border-red-700 text-white font-semibold placeholder:text-white"
                placeholder="Password"
              />
              <ErrorMessage name="password" component='div' className="text-red-500 text-sm"/>
              <Field
                type="password"
                name="confirmPassword"
                className="rounded-sm p-2 bg-transparent border border-red-700 text-white  font-semibold placeholder:text-white"
                placeholder="Comfirm Password"
              />
              <ErrorMessage name="confirmPassword" component='div' className="text-red-500 text-sm"/>
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="bg-red-700   w-28 rounded-3xl text-black font-bold p-3 "
                >
                 {loading? "Sign Up..." : "Sign Up"}
                </button>
              </div>
            </div>
          </Form>
        </Formik>
        <p className="mx-7 flex justify-between">
            New Customer?
            <span
              className="text-orange-500 cursor-pointer font-bold"
            >
             <Link to='/login'>Sign In</Link>
            </span>
          </p>
      </div>
    </div>
  );
};

export default Signup;
