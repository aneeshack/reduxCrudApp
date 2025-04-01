import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../Redux/features/UserSlice'
import axios from '../Axios/Axios';
import { useNavigate } from 'react-router-dom';
import { Rootstate } from '../Redux/Store/store';


const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userName = useSelector((state:Rootstate)=> state.UserData.userData?.name )

    const handleLogout = async()=>{
        try {
            console.log('logout')
            const response = await axios.post("/api/logout");
            console.log('logout response',response.data)
            dispatch(logout()) 
            navigate('/login')       
        } catch (error) {
            console.log('mistake in logout',error)
        }
    }
  return (
    <div className='bg-red-600 w-full h-12 text-white flex items-center fixed justify-between'>
            <h1 className='text-3xl font-bold p-16'>Home</h1>
            <div className='flex items-center '>
              {userName && <h3>{userName?.toUpperCase()}</h3>}
            
            <h3 className='p-16 text-xl cursor-pointer'
            onClick={handleLogout}>Logout</h3>
            
            </div>
    </div>
  )
}

export default Navbar