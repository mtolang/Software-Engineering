import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firestore configuration
import { useNavigate } from "react-router-dom";
import "../styles/forgotpassword.css";

const ForgotPassword = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Query the alumni database to match name and email
      const q = query(
        collection(db, "alumni"),
        where("name", "==", name),
        where("email", "==", email)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const alumniId = querySnapshot.docs[0].id; // Removed unused alumniData

        // Store alumni ID in local storage
        localStorage.setItem("alumni_id", alumniId);

        // Generate a random 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        localStorage.setItem("verification_code", verificationCode);

        // Simulate sending the verification code to the phone number
        alert(`Verification code sent to ${phoneNumber}: ${verificationCode}`);

        // Navigate to ResetPassword page
        navigate("/resetpassword");
      } else if (querySnapshot.empty && phoneNumber) {
      } else {
        alert("No matching alumni found. Please check your details.");
      }
    } catch (error) {
      console.error("Error verifying alumni:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2 className="forgot-password-title">Forgot Password</h2>

        <label className="forgot-password-label">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="forgot-password-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="forgot-password-label">Phone Number</label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          className="forgot-password-input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <label className="forgot-password-label">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="forgot-password-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="forgot-password-button" onClick={handleSubmit}>
          Submit
        </button>
        <button className="back-button" onClick={() => navigate("/Login")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;