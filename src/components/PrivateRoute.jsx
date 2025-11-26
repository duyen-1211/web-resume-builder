import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Authentication/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // Nếu chưa đăng nhập → quay lại login
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
