import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./ProtectedLayout";
import SignIn from "../pages/sign-in/SignIn";
import Dashboard from "../pages/Dashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserFromToken } from "../redux/login/Action";
import ResetPassword from "../pages/sign-in/components/ResetPassword";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

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
        <Route path="/login" element={<SignIn />} />
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
