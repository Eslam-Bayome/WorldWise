import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }),
    [isAuthenticated, navigate];

  //   if (!isAuthenticated) return <Navigate to="/" />;
  // return children
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
