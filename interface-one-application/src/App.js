// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./auth/context/AuthContext";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./features/home/Home";
import Layout from "./features/layout/Layout";
import LandingPage from "./features/LandingPage";
import Footer from "./features/contactus/Footer";
import UserDashBoard from "./features/user/UserDashBoard";
import AdminRoute from "./routes/AdminRoute";
import AdminDashBoard from "./features/admin/AdminDashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Home />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route
              path="interview"
              element={
                <PrivateRoute>
                  <UserDashBoard />
                </PrivateRoute>
              }
            />
          </Route>
          <Route
            path="admindashboard"
            element={
              <AdminRoute>
                <AdminDashBoard />
              </AdminRoute>
            }
          />
          <Route path="**" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
