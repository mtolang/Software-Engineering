import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firestore configuration
import Logo from "../assets/nobglogo.png";
import Logo3 from "../assets/logo3.png"; // Import the third logo
import "../styles/adminlogin.css"; // Import Admin Login styles

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true); // Show loading indicator
    setError(""); // Clear previous error message

    try {
      // Query Firestore for the admin with the provided email and password
      const adminCollection = collection(db, "admin");
      const q = query(
        adminCollection,
        where("Email", "==", email.trim()), // Match Firestore field name
        where("Password", "==", password.trim()) // Match Firestore field name
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Admin found
        const adminDoc = querySnapshot.docs[0]; // Get the first matching document
        const adminData = adminDoc.data(); // Get the document data
        const adminID = adminDoc.id; // Retrieve the document ID as adminID
        const fullName = `${adminData.FName || ""} ${adminData.MName || ""} ${adminData.LName || ""}`.trim(); // Get full name

        // Store admin data in local storage
        const adminWithID = { ...adminData, adminID };
        localStorage.setItem("admin", JSON.stringify(adminWithID));

        alert(`Welcome, ${fullName}`);
        navigate("/adminalumni"); // Redirect to the admin alumni page
      } else {
        // Admin not found
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("An error occurred while logging in. Please try again.");
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  // Clear error message when user types
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(""); // Clear error message
  };

  return (
    <div className="admin-login-container">
      {/* Left Side - Admin Login */}
      <div className="admin-login-box">
        <h2 className="admin-login-title">Administrator Login</h2>

        <div className="form-container">
          {error && <p className="error-message">{error}</p>} {/* Display error messages */}
          <label className="label">Admin Email</label>
          <input
            type="text"
            className="input"
            placeholder="Enter your admin email"
            value={email}
            onChange={handleInputChange(setEmail)} // Clear error on typing
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Enter your password"
            value={password}
            onChange={handleInputChange(setPassword)} // Clear error on typing
          />

          <button className="login-button" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <h1 className="forgot-password" onClick={() => navigate("/login")}>
            Alumni
          </h1>
          <p className="forgot-password" onClick={() => navigate("/forgotpass")}>
            Forgot Password?
          </p>
        </div>
      </div>

      {/* Right Side - No Sign Up, Just Admin Info */}
      <div className="admin-info-box">
        <div className="admin-info-logos">
          <img src={Logo} alt="Alumni Portal Logo" className="admin-logo" />
          <img src={Logo3} alt="Alumni Portal Logo" className="admin-logo" />
        </div>
        <h2 className="admin-info-title">Welcome Administrator</h2>
        <p className="admin-info-text">
          Please login with your administrator credentials.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;