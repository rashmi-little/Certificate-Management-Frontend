import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./ProtectedLayout";
import Dashboard from "../pages/Dashboard";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserFromToken } from "../redux/login/Action";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem("token"))

  useEffect(()=>{
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  },[])

  useEffect(() => {
      if (token) {
        dispatch(getUserFromToken());
      }
    }, [token])

  return (
    <div>
      <Routes>
        {/* Redirect "/" based on login status */}
        <Route
          path="/"
          element={<Navigate to={ (token) ? "/dashboard" : "/login"} />}
        />

        {/* Public Routes*/}
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword/>} />

        {/* Admin Routes */}
        <Route element={<ProtectedLayout/>}>
            <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
