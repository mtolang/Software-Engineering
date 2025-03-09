import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Signup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    yearGraduated: "",
    courseGraduated: "",
    currentAddress: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Open modal first (Do NOT save data yet)
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    // Now save data to Firestore when user confirms
    try {
      await addDoc(collection(db, "Alumni-Portal"), {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,  
        password: formData.password,
        year_graduated: formData.yearGraduated,
        course_graduated: formData.courseGraduated,
        current_address: formData.currentAddress,
        date_registered: serverTimestamp(),
      });

      console.log("Registration successful!");
      setIsModalOpen(false); // Close modal after saving
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">Register</h2>

        <label className="signup-label">Name</label>
        <div className="signup-name">
          <input type="text" name="firstName" placeholder="First" className="signup-input" value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last" className="signup-input" value={formData.lastName} onChange={handleChange} />
        </div>

        <label className="signup-label">Email</label>
        <input type="email" name="email" placeholder="Example_email@gmail.com" className="signup-input" value={formData.email} onChange={handleChange} />

        <label className="signup-label">Password</label>
        <input type="password" name="password" placeholder="Enter your password" className="signup-input" value={formData.password} onChange={handleChange} />

        <label className="signup-label">Year Graduated</label>
        <input type="date" name="yearGraduated" className="signup-input" value={formData.yearGraduated} onChange={handleChange} />

        <label className="signup-label">Course Graduated</label>
        <select name="courseGraduated" className="signup-select" value={formData.courseGraduated} onChange={handleChange}>
          <option value="">Select Course</option>
          <option>BSIT</option>
          <option>BSCS</option>
          <option>BSECE</option>
          <option>BSEE</option>
        </select>

        <label className="signup-label">Current Address</label>
        <input type="text" name="currentAddress" placeholder="Location" className="signup-input" value={formData.currentAddress} onChange={handleChange} />

        <button className="signup-button" onClick={handleSubmit}>Submit</button>
        <button className="signup-back-button" onClick={() => navigate("/Login")}>Back</button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmation</h3>
            <p>Your registration will be recorded.</p>
            <button className="confirm-button" onClick={handleConfirm}>Confirm</button>
            <button className="cancel-button" onClick={() => setIsModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
