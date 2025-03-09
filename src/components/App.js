import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ForgotPassword from "../pages/ForgotPassword";
import AdminHome from "../pages/AdminHome";
import AdminLogin from "../pages/AdminLogin"

const App = () => {
  return (
    <Router> 
      <Routes>
        {/* ✅ Default Route Redirects to /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* ✅ Lowercase paths (recommended) */}
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminhome" element={<AdminHome />} />
      </Routes>
    </Router>
  );
};

export default App;
