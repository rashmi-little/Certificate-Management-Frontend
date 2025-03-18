import {Navigate, Outlet } from 'react-router-dom'
import Loader from '../components/Loader';

const ProtectedLayout = ({role}) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if(!token) {
    return <Navigate to="/login" />
  }

  // Prevent immediate redirecting, if role is not available
  // if(!userRole) {
  //   return <Loader/>;
  // }

  // if(userRole !== role) {
  //   return <Navigate to={userRole === "USER" ? "/home" : "/dashboard"} />
  // }

  return <Outlet/>

}

export default ProtectedLayout