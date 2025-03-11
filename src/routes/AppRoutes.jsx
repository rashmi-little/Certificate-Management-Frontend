import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "../pages/user/Homepage";
import ProtectedLayout from "./ProtectedLayout";
import SignIn from "../pages/sign-in/SignIn";
import Dashboard from "../pages/admin/Dashboard";

const AppRoutes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === true);
  const role = localStorage.getItem("role");
  useEffect(()=>{
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === true)
  },[localStorage.getItem("isLoggedIn")])
  return (
    <div>
      <Routes>
        {/* Redirect "/" based on login status */}
        <Route
          path="/"
          element={<Navigate to={ isLoggedIn ? {role === "USER" ? "/home" : "/dashboard"} : "/login"} />}
        />

        {/* Public Routes*/}
        <Route path="/login" element={<SignIn />} />
        

        {/* Protected Routes */}
        <Route element={<ProtectedLayout role="USER" />}>
          <Route path="/home" element={<Homepage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedLayout role="ADMIN" />}>
            <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
