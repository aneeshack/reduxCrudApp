import { ErrorMessage, Field, Form, Formik } from "formik";
import LoginValidation  from '../FormValidation/LoginValidation';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../Axios/Axios";
import { toast } from "react-toastify";
import { setUserData } from "../Redux/features/UserSlice";

interface loginData{
  email: string;
  password: string
}

const initialValues: loginData = {
  email:'',
  password:''
}

const Login = () => {
  const [ loading, setLoading ] = useState(false);
  const [ errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async(userData:loginData)=>{
    try {
      setLoading(true)
      setErrorMessage('')
      console.log(userData)
      const response = await axios.post('/api/login',userData)
      console.log('response', response.data);

      if(response.data.success){
        toast.success('Login Successfullyl')

        const FetchUserData = await axios.get('/api/fetchUserData')
        if(FetchUserData){
          console.log('fetch data',FetchUserData.data)
          dispatch(setUserData(FetchUserData.data))
          navigate('/home')
        }else{
          toast.error('Session expired.Please login again.')
          navigate('/login')

        }
        setTimeout(() => {
          setLoading(false)
        }, 2000);
      }else{
       setErrorMessage('Invalid email or password') 
      }
    } catch (error) {
      console.log('error in login',error)
    }
    
  }
  
  return (
    <div className="flex justify-center items-center h-screen bg-linear-gradient(#0000007e, #0000007e) bg-[url('/download2.jpg')] bg-cover">

    {/* <div className="flex justify-center  items-center h-screen bg-linear-gradient(#0000007e, #0000007e) bg-[url('download2.jpg')] bg-cover "> */}
      <div className=" bg-opacity-50  border-2 hover:ring-8 hover:ring-red-500 hover:border-none bg-gray-900 h-5/6  w-1/4 min-w-96 rounded-md text-white ">
        <h1 className="flex justify-center text-3xl font-bold p-16">
          Sign In
        </h1>
        { errorMessage? <p className="text-red-500 text-500">{errorMessage}</p>: <></>}
        <Formik
        initialValues={initialValues}
        validationSchema={LoginValidation}
        onSubmit={onSubmitHandler}>
          <Form >
        <div className="flex flex-col gap-2 m-7 ">
          <Field
            type="email"
            name = "email"
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
            <button className="bg-red-500 ml-24  w-28 rounded-3xl text-white font-bold p-3 "
            type="submit" >
              {loading? 'Sign In...' :'Sign In'}
            </button>
        </div>
        </Form>
        </Formik>
        <p className="mx-7 flex justify-between">
            New Customer?
            <span
              className="text-orange-500 cursor-pointer font-bold"
            >
             <Link to='/signup'>Sign Up</Link>
            </span>
          </p>
      </div>
    </div>
  )
};

export default Login;
