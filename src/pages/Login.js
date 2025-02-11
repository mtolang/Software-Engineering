import React from "react";
import "../styles/login.css"; // Import the CSS file

const Login = () => {
  return (
    <div className="login-container">
      {/* Left Side - Login */}
      <div className="login-box">
        <h2 className="login-title">Sign In</h2>
        <div className="form-container">
          <label className="label">Username</label>
          <input type="text" className="input" placeholder="Enter your username" />

          <label className="label">Password</label>
          <input type="password" className="input" placeholder="Enter your password" />

          <button className="login-button">Sign In</button>

          <p className="forgot-password">Forgot Password?</p>
        </div>
      </div>

      {/* Right Side - Sign Up */}
        <div className="signup-box">
        <img src="../src/assets/logo.png" alt="Alumni Portal Logo" className="signup-logo" />
        <h2 className="signup-title">Welcome to Alumni Portal</h2>
        <p className="signup-text">Don’t have an account?</p>
        <button className="signup-button">Sign Up</button>
        </div>
    </div>
  );
};

export default Login;
