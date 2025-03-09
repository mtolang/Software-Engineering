import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/forgotpassword.css";

const ForgotPassword = () => {

  const navigate = useNavigate();
  
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2 className="forgot-password-title">Forgot Password</h2>

        <label className="forgot-password-label">Name</label>
        <input type="text" placeholder="Enter your name" className="forgot-password-input" />

        <label className="forgot-password-label">Phone Number</label>
        <input type="tel" placeholder="Enter your phone number" className="forgot-password-input" />

        <label className="forgot-password-label">Email</label>
        <input type="email" placeholder="Enter your email" className="forgot-password-input" />

        <button className="forgot-password-button">Submit</button>
        <button className="back-button" onClick={() => navigate("/Login")}>Back</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
