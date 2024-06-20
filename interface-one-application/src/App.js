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
import Login from "./auth/components/login/Login";
import SignUp from "./auth/components/login/Login";

const App = () => {
  const login = false;
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {login ? (
            <Route path="/" element={<Navigate to="/dashboard" />} />
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <div>Dash</div>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
