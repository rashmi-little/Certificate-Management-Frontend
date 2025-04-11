import "../components/Sidebar.css"
import Dashboard from "../assets/Dashboard/Dashboard.svg"
import S_Dashboard from "../assets/Dashboard/S_Dashboard.svg"
import NewRequest from "../assets/Dashboard/NewRequest.svg"
import S_NewRequest from "../assets/Dashboard/S_NewRequest.svg"
import RequestLog from "../assets/Dashboard/RequestLog.svg"
import S_RequestLog from "../assets/Dashboard/S_RequestLog.svg"
import Certificate from "../assets/Dashboard/Certificate.svg"
import S_Certificate from "../assets/Dashboard/S_Certificate.svg"
import UserManagement from "../assets/Dashboard/UserManagement.svg"
import S_UserManagement from "../assets/Dashboard/S_UserManagement.svg"
import TicketRequests from "../assets/Dashboard/TicketRequests.svg"
import S_TicketRequests from "../assets/Dashboard/S_TicketRequests.svg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Sidebar = ({setPathname}) => {
    const items = [
        {
            icon: Dashboard,
            selectedIcon: S_Dashboard,
            label: "Dashboard"
        },
        {
            icon: NewRequest,
            selectedIcon: S_NewRequest,
            label: "New Request"
        },
        {
            icon: RequestLog,
            selectedIcon: S_RequestLog,
            label: "Request Log"
        },
        {
            icon: Certificate,
            selectedIcon: S_Certificate,
            label: "Certificates"
        },
        {
            icon: UserManagement,
            selectedIcon: S_UserManagement,
            label: "User Management"
        },
        {
            icon: TicketRequests,
            selectedIcon: S_TicketRequests,
            label: "Ticket Requests"
        },

    ]
    const paths = new Map();
    paths.set("Dashboard", "/dashboard");
    paths.set("New Request", "/request");
    paths.set("Request Log", "/logs");
    paths.set("Certificates", "/certificates");
    paths.set("User Management", "/users");
    paths.set("Ticket Requests", "/tickets");
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState("Dashboard");

    const handleActive = (label) => {
        setIsActive(label);
        navigate(paths.get(label));
    }

    return (
        <div className="sidebar w-[256px] min-h-[calc(100vh-80px)] ">
            {items.map((item) =>
                <div onClick={() => handleActive(item.label)}
                className={`w-[224px] h-[56px] rounded-lg  p-4 flex items-center gap-4 border-l-[5px]
                 ${isActive === item.label ? " border-l-[#0066FF] bg-[#C0D9FF] text-[#0066FF]" : "cursor-pointer border-l-transparent"}
                `}>
                    <img className="h-6 w-6"
                        src={`${isActive === item.label ? item.selectedIcon : item.icon}`} alt={item.label} />
                    <p>{item.label}</p>
                </div>
            )}
        </div>
    )
}

export default Sidebar