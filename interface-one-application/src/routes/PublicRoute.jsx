import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../api/routeauth/RouteAuth";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
