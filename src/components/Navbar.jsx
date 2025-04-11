import mindfirelogo from "../assets/Dashboard/mindfirelogo.svg"
import profile from "../assets/Dashboard/profile.png"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import "../components/Navbar.css"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar w-full flex justify-between items-center px-6">
       
        <div onClick={() => navigate("/")}
        className="w-[256px] h-[80px] flex justify-between items-center cursor-pointer">
            <img className="w-[120px] h-[47px]"
            src={mindfirelogo} alt="Mindfire logo" />
        </div>
      
        <div className="flex justify-center items-center gap-2">
            <img className="h-[32px] w-[32px] bg-[#C0D9FF] rounded-full"
            src={profile} alt="Profile Image" />
            <div className="flex flex-col gap-0.5">
                <p className="text-[#394555] font-bold">Moni Roy</p>
                <p className="text-[#757D8A] text-sm">Admin</p>
            </div>
            <div className="bg-[#FAFAFA] rounded-full cursor-pointer">
                <KeyboardArrowDownIcon className="text-[#757D8A]" />
            </div>
        </div>
    </div>
  )
}

export default Navbar