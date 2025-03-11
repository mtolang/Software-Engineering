import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Logo from "../assets/nobglogo.png";
import "../styles/login.css"; // Import User Login styles

const Login = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // State for switch
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleToggle = () => {
    setIsAdmin(!isAdmin);
    navigate(isAdmin ? "/Login" : "/AdminLogin"); // Navigate to the correct page
  };

  const handleLogin = async () => {
    if (!email && !password) {
      alert("Please enter your email and password.");
      return;
    }

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    if (!password) {
      alert("Please enter your password.");
      return;
    }

    try {
      const q = query(collection(db, "alumni"), where("email", "==", email), where("password", "==", password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        navigate("/Home");
      } else {
        alert("Incorrect login details.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again.");
    }
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
          <label className="label">Email</label>
          <input
            type="text"
            className="input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-button" onClick={handleLogin}>Sign In</button>

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
