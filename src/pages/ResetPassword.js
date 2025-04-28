import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firestore configuration
import { useNavigate } from "react-router-dom";
import "../styles/resetpassword.css";

const ResetPassword = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      // Get the stored verification code and alumni ID from local storage
      const storedCode = localStorage.getItem("verification_code");
      const alumniId = localStorage.getItem("alumni_id");

      if (!alumniId) {
        alert("No alumni ID found. Please try the Forgot Password process again.");
        return;
      }

      if (verificationCode !== storedCode) {
        alert("Invalid verification code. Please try again.");
        return;
      }

      // Update the password in the alumni database
      const alumniDocRef = doc(db, "alumni", alumniId);
      await updateDoc(alumniDocRef, { password: newPassword });

      alert("Password reset successfully!");
      localStorage.removeItem("verification_code");
      localStorage.removeItem("alumni_id");

      // Navigate back to the login page
      navigate("/Login");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h2 className="reset-password-title">Reset Password</h2>

        <label className="reset-password-label">Verification Code</label>
        <input
          type="text"
          placeholder="Enter the verification code"
          className="reset-password-input"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />

        <label className="reset-password-label">New Password</label>
        <input
          type="password"
          placeholder="Enter your new password"
          className="reset-password-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button className="reset-password-button" onClick={handleResetPassword}>
          Reset Password
        </button>
        <button className="back-button" onClick={() => navigate("/ForgotPassword")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;