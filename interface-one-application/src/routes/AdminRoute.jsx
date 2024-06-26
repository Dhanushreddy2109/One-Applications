import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/context/AuthContext";

const AdminRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  const userDetails = user ? JSON.parse(user) : null;
  const { isAuthenticated } = useAuth();
  console.log("userDEtails,->", userDetails);
  return isAuthenticated && userDetails?.role === "Admin" ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
