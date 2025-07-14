import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
  const token = localStorage.getItem("todo_token");

  if (!token) return <Navigate to="/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("todo_token");
      return <Navigate to="/login" replace />;
    }

    return <Outlet />;
  } catch (err) {
    localStorage.removeItem("todo_token");
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
