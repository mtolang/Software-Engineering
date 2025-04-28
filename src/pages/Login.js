import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import Logo from "../assets/nobglogo.png";
import Logo3 from "../assets/logo3.png"; // Import the third logo
import "../styles/login.css"; // Import User Login styles

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      const q = query(
        collection(db, "alumni"),
        where("email", "==", email),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const userWithAlumniIdAndRole = {
          ...userData,
          alumni_id: querySnapshot.docs[0].id, // Include the document ID as alumni_id
          roles: userData.roles, // Include the roles field
        };
        localStorage.setItem("user", JSON.stringify(userWithAlumniIdAndRole)); // Store user data in local storage
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
          <h1 className="forgot-password" onClick={() => navigate("/adminlogin")}>
            Administrator
          </h1>
          <p className="forgot-password" onClick={() => navigate("/ForgotPass")}>
            Forgot Password?
          </p>
        </div>
      </div>

      {/* Right Side - Sign Up */}
      <div className="login-signup-box">
        <div className="signup-logos">
          <img src={Logo} alt="Alumni Portal Logo" className="signup-logo" />
          <img src={Logo3} alt="Second Logo" className="signup-logo" />
        </div>
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