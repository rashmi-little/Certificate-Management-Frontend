import React from 'react'
import { Outlet } from 'react-router-dom'
import Login from '../pages/Login'

const ProtectedLayout = ({isLoggedIn}) => {
  return (
    // If not loggedin, redirect to login page
    isLoggedIn ? <Outlet/> : <Login/>
  )
}

export default ProtectedLayout