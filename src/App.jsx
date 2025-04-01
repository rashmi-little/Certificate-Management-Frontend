import { Navigate, Route, Routes } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserFromToken } from "./redux/login/Action";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";

function App() {

  const dispatch = useDispatch();
  const user = useSelector(store => store?.login?.user);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(getUserFromToken());
    }
  }, [])

  return (
    <>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={user ? <AppRoutes /> : <Navigate to="/login" />} >
          <Route index path="dashboard" element={<Dashboard />} />
          <Route path="request" element={<div>Requests Page</div>} />
          <Route path="logs" element={<div>Logs Page</div>} />
          <Route path="certificates" element={<div>Certificates Page</div>} />
          <Route path="users" element={<div>Users Page</div>} />
          <Route path="tickets" element={<div>Tickets Page</div>} />
        </Route>
      </Routes>

    </>
  )
}

export default App
