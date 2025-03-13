import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "../pages/user/Homepage";
import ProtectedLayout from "./ProtectedLayout";
import SignIn from "../pages/sign-in/SignIn";
import Dashboard from "../pages/admin/Dashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserFromToken } from "../redux/login/Action";

const AppRoutes = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  // const token = useSelector(state => state.login?.token);

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
          element={<Navigate to={ (token && role) ? ( role === "USER" ? "/home" : "/dashboard") : "/login"} />}
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
