import {Navigate, Outlet } from 'react-router-dom'
import Loader from '../components/Loader';

const ProtectedLayout = ({role}) => {
  const token = localStorage.getItem("token");
  console.log("TOken In Protected Route ", token);
  const userRole = localStorage.getItem("role");
  console.log("user role from localStorage in Protected Route ", userRole);

  if(!token) {
    console.log("TOken is empty and redirecting user ");
    return <Navigate to="/login" />
  }

  // Prevent immediate redirecting, if role is not available
  if(!userRole) {
    return <Loader/>;
  }

  if(userRole !== role) {
    return <Navigate to={userRole === "USER" ? "/home" : "/dashboard"} />
  }

  return <Outlet/>

}

export default ProtectedLayout