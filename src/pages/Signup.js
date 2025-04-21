import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";

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
    phoneNumber: "+63", // Pre-filled with +63
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Check for empty fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.yearGraduated ||
      !formData.courseGraduated ||
      !formData.currentAddress ||
      !formData.phoneNumber
    ) {
      setError("Please fill out all fields.");
      return;
    }

    // Check for existing registration
    const q = query(
      collection(db, "registrants"),
      where("name", "==", `${formData.firstName} ${formData.lastName}`),
      where("email", "==", formData.email),
      where("year_graduated", "==", formData.yearGraduated)
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setError("A registration with the same name, email, and year of graduation already exists.");
      return;
    }

    // Open modal first (Do NOT save data yet)
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      // Map courses to roles
      const courseToRoleMap = {
        "College of Accounting and Business Education": "CABE",
        "College of Arts and Humanities": "CAH",
        "College of Computer Studies": "CCS",
        "College of Engineering and Architecture": "CEA",
        "College of Human Environmental Science and Food Studies": "CHEFS",
        "College of Medical and Biological Sciences": "CMBS",
        "College of Music": "CM",
        "College of Nursing": "CN",
        "College of Pharmacy and Chemistry": "CPC",
        "College of Teacher Education": "CTE",
      };

      // Determine the role based on the course graduated
      const role = courseToRoleMap[formData.courseGraduated] || "Unknown";

      // Use the full graduation date (e.g., 20250418)
      const fullDate = formData.yearGraduated.replace(/-/g, ""); // Remove dashes from the date

      // Fetch the latest count of registrants
      const registrantsSnapshot = await getDocs(collection(db, "registrants"));
      const count = registrantsSnapshot.size + 1; // Increment count for the new registrant

      // Generate the unique registrant_ID
      const registrantID = `${fullDate}${String(count).padStart(4, "0")}`; // e.g., 202504180008

      // Save data to Firestore
      await addDoc(collection(db, "registrants"), {
        registrant_ID: registrantID, // Automatically generated registrant ID
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        year_graduated: formData.yearGraduated,
        course_graduated: formData.courseGraduated,
        current_address: formData.currentAddress,
        phone_number: formData.phoneNumber, // Save phone number
        roles: role, // Automatically assign roles based on course_graduated
        date_registered: serverTimestamp(),
      });

      console.log("Registration successful!");
      setIsModalOpen(false); // Close modal after saving
      navigate("/Login"); // Redirect to login page after successful registration
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">Register</h2>

        {error && <p className="error-message">{error}</p>}

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

        <label className="signup-label">Colleges Graduated</label>
        <select name="courseGraduated" className="signup-select" value={formData.courseGraduated} onChange={handleChange}>
          <option value="">Select Colleges</option>
          <option>College of Accounting and Business Education</option>
          <option>College of Arts and Humanities</option>
          <option>College of Computer Studies</option>
          <option>College of Engineering and Architecture</option>
          <option>College of Human Environmental Science and Food Studies</option>
          <option>College of Medical and Biological Sciences</option>
          <option>College of Music</option>
          <option>College of Nursing</option>
          <option>College of Pharmacy and Chemistry</option>
          <option>College of Teacher Education</option>
        </select>

        <label className="signup-label">Current Address</label>
        <input type="text" name="currentAddress" placeholder="Location" className="signup-input" value={formData.currentAddress} onChange={handleChange} />

        <label className="signup-label">Phone Number</label>
        <input
          type="tel" // Ensures the input is for telephone numbers
          name="phoneNumber"
          placeholder="+63"
          className="signup-input"
          value={formData.phoneNumber}
          onChange={(e) => {
            // Allow only numbers and the "+" character
            const value = e.target.value;
            if (/^\+?[0-9]*$/.test(value)) {
              setFormData({ ...formData, phoneNumber: value });
            }
          }}
        />

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