import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import "../styles/alumniDonations.css";

const AlumniDonations = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    colleges_graduated: "",
    amount: "",
    bank_type: "",
    payment_method: "bank",
    transaction_id: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // Function to fetch user details and populate form
  const fetchUserDetails = async () => {
    const user = localStorage.getItem("user"); // Get the user object from local storage
    if (!user) {
      setError("User data not found in local storage.");
      return;
    }

    const parsedUser = JSON.parse(user); // Parse the user object
    const userId = parsedUser.id; // Assuming the user object contains an `id` field

    try {
      const userDocRef = doc(db, "alumni", userId); // Reference to the user's document in the alumni database
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const alumni_id = userDoc.id; // Get the document ID as alumni_id

        setFormData((prevFormData) => ({
          ...prevFormData,
          full_name: userData.name || "", // Use the name field
          email: userData.email || "",
          colleges_graduated: userData.colleges_graduated || "",
        }));

        console.log("Alumni ID:", alumni_id); // Log the alumni_id for debugging
        console.log("Roles:", userData.roles); // Log roles if needed
      } else {
        setError("User details not found in the alumni database.");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError("An error occurred while fetching user details.");
    }
  };

  useEffect(() => {
    fetchUserDetails(); // Fetch user details when the component mounts
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      full_name,
      email,
      colleges_graduated,
      amount,
      bank_type,
      transaction_id,
    } = formData;

    if (
      !full_name ||
      !email ||
      !colleges_graduated ||
      !amount ||
      !bank_type ||
      !transaction_id
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "donations"), {
        ...formData,
        amount: parseFloat(formData.amount),
        date_sent: serverTimestamp(), // Use Firestore's server timestamp
        status: "pending",
      });

      setStatus("Donation submitted successfully! Thank you for your support.");
      setFormData({
        full_name: "",
        email: "",
        colleges_graduated: "",
        amount: "",
        bank_type: "",
        payment_method: "bank",
        transaction_id: "",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting donation:", err);
      setError("An error occurred while submitting your donation. Please try again.");
    }
  };

  return (
    <div className="donation-container">
      <h2 className="donation-title">Alumni Donation Portal</h2>
      <p className="donation-description">
        Please fill out the form below to submit your donation details.
      </p>

      {status && <p className="success-message">{status}</p>}
      {error && <p className="error-message">{error}</p>}

      <form className="donation-form" onSubmit={handleSubmit}>
        <label className="donation-label">Full Name</label>
        <input
          type="text"
          name="full_name"
          placeholder="Enter your full name"
          className="donation-input"
          value={formData.full_name}
          onChange={handleChange}
        />

        <label className="donation-label">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="donation-input"
          value={formData.email}
          onChange={handleChange}
        />

        <label className="donation-label">Course Graduated</label>
        <input
          type="text"
          name="colleges_graduated"
          placeholder="Enter your course"
          className="donation-input"
          value={formData.colleges_graduated}
          onChange={handleChange}
        />

        <label className="donation-label">Donation Amount (PHP)</label>
        <input
          type="number"
          name="amount"
          placeholder="Enter donation amount"
          className="donation-input"
          value={formData.amount}
          onChange={handleChange}
        />

        <label className="donation-label">Bank Type</label>
        <select
          name="bank_type"
          className="donation-select"
          value={formData.bank_type}
          onChange={handleChange}
        >
          <option value="">Select Bank</option>
          <option value="Asia United Bank">Asia United Bank</option>
          <option value="BDO Network Bank">BDO Network Bank</option>
          <option value="BDO Unibank">BDO Unibank</option>
          <option value="MetroBank">MetroBank</option>
        </select>

        <label className="donation-label">Transaction ID</label>
        <input
          type="text"
          name="transaction_id"
          placeholder="Enter transaction ID"
          className="donation-input"
          value={formData.transaction_id}
          onChange={handleChange}
        />

        <label className="donation-label">Message (Optional)</label>
        <textarea
          name="message"
          placeholder="Enter a message (optional)"
          className="donation-textarea"
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="donation-button">
          Submit Donation
        </button>
      </form>

      <button
        className="back-button"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default AlumniDonations;