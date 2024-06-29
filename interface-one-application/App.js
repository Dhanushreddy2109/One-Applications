import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./api/routeauth/RouteAuth";
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./features/home/Home";
import Layout from "./features/layout/Layout";
import LandingPage from "./features/LandingPage";
import UserDashBoard from "./features/user/UserDashBoard";
import AdminRoute from "./routes/AdminRoute";
import AdminDashBoard from "./features/admin/AdminDashboard";
import Consultant from "./features/consultant/Consyltant";
import Jobs from "./features/jobs/Jobs";
import ConsultantList from "./features/admin/ConsultantList";

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
            <Route
              path="consultant"
              element={
                <PrivateRoute>
                  <Consultant />
                </PrivateRoute>
              }
            />
            <Route
              path="jobs"
              element={
                <PrivateRoute>
                  <Jobs />
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
          <Route
            path="jobslist"
            element={
              <AdminRoute>
                <Jobs />
              </AdminRoute>
            }
          />
          <Route
            path="consultants"
            element={
              <AdminRoute>
                <ConsultantList />
              </AdminRoute>
            }
          />

          <Route path="**" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </AuthProvider>
  );
};

export default App;
