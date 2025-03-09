import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/nobglogo.png";
import "../styles/login.css"; // Import User Login styles

const Login = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // State for switch

  const handleToggle = () => {
    setIsAdmin(!isAdmin);
    navigate(isAdmin ? "/Login" : "/AdminLogin"); // Navigate to the correct page
  };

  return (
    <div className="login-container">
      {/* Left Side - Login */}

      <div className="login-box">

      <div className="login-switch-container">
        <span>User</span>
        <label className="login-switch">
          <input type="checkbox" checked={isAdmin} onChange={handleToggle} />
          <span className="login-slider"></span>
        </label>
        <span>Admin</span>
      </div>
      
        <h2 className="login-title">Sign In</h2>

        <div className="form-container">
          <label className="label">Username</label>
          <input type="text" className="input" placeholder="Enter your username" />

          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Enter your password" />

          <button className="login-button" onClick={() => navigate("/Home")}>Sign In</button>

          <p className="forgot-password" onClick={() => navigate("/ForgotPass")}>
            Forgot Password?
          </p>
        </div>
      </div>

      {/* Right Side - Sign Up */}
      <div className="login-signup-box">
        <img src={Logo} alt="Alumni Portal Logo" className="signup-logo" />
        <h2 className="login-signup-title">Welcome to Alumni Portal</h2>
        <p className="login-signup-text">Don’t have an account?</p>
        <button className="login-signup-button" onClick={() => navigate("/Signup")}>
          Sign Up
        </button>

        
      </div>
    </div>
  );
};

export default Login;
