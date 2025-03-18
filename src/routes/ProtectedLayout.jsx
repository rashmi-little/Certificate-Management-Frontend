import React from 'react'
import {Navigate, Outlet } from 'react-router-dom'
import Homepage from '../pages/user/Homepage';

const ProtectedLayout = ({role}) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userRole = localStorage.getItem("role");

  if(!isLoggedIn) {
    return <Navigate to="/login" />
  }

  if(userRole !== role) {
    return <Navigate to="/" />
  }

  return <Outlet/>

}

export default ProtectedLayout