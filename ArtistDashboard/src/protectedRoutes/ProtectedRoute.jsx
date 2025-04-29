import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log("Token in ProtectedRoute: ", token);

  // If no token, redirect to login page
  if (!token) {
    console.log("No token found. Redirecting to login.");
    return <Navigate to="/login" />;
  }

  // If token exists, render the children (protected content)
  return children;
};

export default ProtectedRoute;
