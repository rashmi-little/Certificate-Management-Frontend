import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../index.css"

const AppRoutes = () => {

  return (
    <div className="min-h-screen w-screen">
        <Navbar />
        <div className=" flex min-h-[calc(100vh-80px)] w-full">
          <Sidebar />
          <div className="flex-1 min-h-full rounded-tl-3xl border-t-[1px] border-l-[1px] p-6 gap-8 bg-[#FAFAFA]
            dashboard-body">
          <Outlet />
        </div>
    </div>
    </div>
  );
};

export default AppRoutes;
