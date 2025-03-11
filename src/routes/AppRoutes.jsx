import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import ProtectedLayout from "./ProtectedLayout";
import SignIn from "../pages/sign-in/SignIn";
import SignUp from "../pages/sign-up/SignUp";

const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === true);

  useEffect(()=>{
    setIsLoggedIn()
  },[localStorage.getItem("isLoggedIn")])
  return (
    <div>
      <Routes>
        {/* Redirect "/" based on login status */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/home" : "/login"} />}
        />

        {/* Public Routes*/}
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route element={<ProtectedLayout isLoggedIn={isLoggedIn} />}>
          <Route path="/home" element={<Homepage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
