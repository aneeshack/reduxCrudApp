import { useNavigate } from "react-router-dom";
import Navbar from "../components/UserNavbar";
import { useSelector } from "react-redux";
import { Rootstate } from '../Redux/Store/store';

const Home = () => {

  const userName = useSelector((state:Rootstate)=>state.UserData.userData?.name)
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center bg-black h-screen bg- text-white">
        <div className=" flex flex-col justify-center items-center ">
          <h1 className="text-[50px] " style={{ color: "gold" }}>
            {" "}
            Welcome {userName }
          </h1>
          <button className="bg-red-600 text-2xl p-2 mt-3 rounded-3xl w-1/2 font-bold text-red-100 hover:border hover:border-red-500 hover:bg-transparent"
          onClick={()=>navigate('/profile')}>
            View Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
