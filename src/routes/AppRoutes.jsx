import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../index.css"

const AppRoutes = () => {

  return (
    <div>
      <div>
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 rounded-tl-3xl border-t-[1px] border-l-[1px] p-6 gap-8 bg-[#FAFAFA]
            dashboard-body
          ">
            <Outlet />
          </div>
        </div>

      </div>

    </div>
  );
};

export default AppRoutes;