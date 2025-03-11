import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/nobglogo.png";
import "../styles/adminlogin.css"; // Import Admin Login styles

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(true); // Admin mode is ON

  const handleToggle = () => {
    setIsAdmin(!isAdmin);
    navigate(isAdmin ? "/Login" : "/AdminLogin");
  };

  return (
    <div className="admin-login-container">
      {/* Left Side - Admin Login */}
      <div className="admin-login-box">

      <div className="admin-switch-container">
        <span>User</span>
        <label className="admin-switch">
          <input type="checkbox" checked={isAdmin} onChange={handleToggle} />
          <span className="admin-slider"></span>
        </label>
        <span>Admin</span>
      </div>

        <h2 className="admin-login-title">Administrator Login</h2>

        <div className="form-container">
          <label className="label">Admin Username</label>
          <input type="text" className="input" placeholder="Enter your admin username" />

          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Enter your password" />

          <button className="login-button" onClick={() => navigate("/adminregistrants")}>Login</button>

          <p className="forgot-password" onClick={() => navigate("/forgotpass")}>
            Forgot Password?
          </p>
        </div>
      </div>

      {/* Right Side - No Sign Up, Just Admin Info */}
      <div className="admin-info-box">
        <img src={Logo} alt="Alumni Portal Logo" className="admin-logo" />
        <h2 className="admin-info-title">Welcome Administrator</h2>
        <p className="admin-info-text">Please login with your administrator credentials.</p>

       
      </div>
    </div>
  );
};

export default AdminLogin;
