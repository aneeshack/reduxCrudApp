import Signup from "./Pages/Signup"
import axios from './Axios/Axios'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { setUserData } from "./Redux/features/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from './Pages/Login'
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";


axios.defaults.withCredentials = true;


const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state:any) => state.UserData.userData);

  useEffect(() => {
    const fetch = async() => {
      try {
        const userDetails = await axios.get('/api/fetchUserData');
        console.log('user details:',userDetails)
        dispatch(setUserData(userDetails.data))
        
      } catch (error) {
        console.log('Error in showing user data or not responding',error)
      }
    };
    fetch();
  },[dispatch])

  return (
    <div>
      <ToastContainer theme="dark" />
      <Router>
        <Routes>
          <Route path="/" element= {
            userData ?.role ==='User'? <Home/>: <Navigate to='/login' />
          }/>
          <Route path="/login"
          element ={
            !userData? (<Login />):userData.role==="User"?(
              <Navigate to='/home'/>
            ):(
              <Navigate to='/admin-home' />
            )
          }/>
           <Route path="/signup" element ={
            !userData? (<Signup />):userData.role==="User"?(
              <Navigate to='/home'/>
            ):(
              <Navigate to='/admin-home' />
            )
          }/> 
          <Route path="/home" element={
            userData? (userData?.role === 'User'? <Home/>: <Dashboard/> ):<Navigate to='/login'/>
          }/>
          <Route path="/profile" element={
            userData?.role === 'User'? <Profile /> :<Navigate to='/' />
          }/>
          <Route path="/admin-home" element={
            userData?.role === 'Admin'? <Dashboard/>:<Navigate to='/login'/>
          }/>
        </Routes>
      </Router>
    </div>
  )
}

export default App