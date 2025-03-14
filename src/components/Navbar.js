import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/nobglogo.png";
import profilePic from "../assets/profile.webp"; // Import a static profile image
import "../styles/components/navbar.css"; // Import CSS file

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".navbar-dropdown")) {
        setDropdown(null);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <nav className="navbar">
      {/* Left Side - Logo */}
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="navbar-logo-img" />
      </div>

      {/* Center - Title and Navigation */}
      <div className="navbar-center">
        <h1 className="navbar-title">ALUMNI PORTAL</h1>
        <div className="navbar-links">
          <Link to="/home" className="navbar-nav-link">HOME</Link>

          {/* Alumni Updates Dropdown */}

          {/* Reports Dropdown */}
          <Link to="/job" className="navbar-nav-link">JOB</Link>

          {/* Chats */}
          <Link to="/chats" className="navbar-nav-link">CHATS</Link>

          {/* Job Posting Dropdown */}
          <Link to="/alumnisurvey" className="navbar-nav-link">SURVEY</Link>
        </div>
      </div>

      {/* Right Side - Alumni Profile Dropdown */}
      <div className="navbar-dropdown">
        <button onClick={(e) => { e.stopPropagation(); toggleDropdown("profile"); }} className="navbar-profile-btn">
          <img src={profilePic} alt="Profile" className="navbar-profile-img" />
        </button>
        {dropdown === "profile" && (
          <div className="profile-navbar-dropdown-menu">
            <Link to="/profile" className="navbar-dropdown-item">Edit Profile</Link>
            <button className="navbar-dropdown-item" onClick={() => navigate("/login")}>Sign Out</button>
          </div>
        )}
      </div>

      {/* Job Modal */}
      
    </nav>
  );
};

export default Navbar;