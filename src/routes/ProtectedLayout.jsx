import React from 'react'
import {Outlet } from 'react-router-dom'
import SignIn from '../pages/sign-in/SignIn';
import Homepage from '../pages/user/Homepage';

const ProtectedLayout = ({role}) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userRole = localStorage.getItem("role");

  if(!isLoggedIn) {
    return <SignIn/>
  }

  if(userRole !== role) {
    return <Homepage/>
  }

  return <Outlet/>

}

export default ProtectedLayout