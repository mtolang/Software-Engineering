import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/verticalnavbar.css";
import logo from "../assets/nobglogo.png";
import userImage from "../assets/logo.png"; // Replace with actual image path

const VerticalNavbar = () => {
  return (
    <aside className="sidebar">
      {/* Logo & Title */}
      <div className="sidebar-header">
        <img src={logo} alt="Alumni Portal Logo" className="logo" />
        <h2 className="portal-title">ALUMNI PORTAL</h2>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <div className="nav-section">
          <span className="section-title">GENERAL</span>
          <Link to="/events" className="nav-item">Events</Link>
          <Link to="/survey" className="nav-item">Survey</Link>
          <Link to="/donations" className="nav-item">Donations</Link>
        </div>

        <div className="nav-section">
          <span className="section-title">USER MANAGEMENT</span>
          <Link to="/alumni" className="nav-item">Alumni</Link>
          <Link to="/registrants" className="nav-item active">Registrants</Link>
          <Link to="/adminlogin" className="nav-item">Logout</Link>
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="user-profile">
        <img src={userImage} alt="User Profile" className="user-avatar" />
        <div className="user-info">
          <p className="user-name">Martin Rey Tolang</p>
          <p className="user-role">Administrator</p>
        </div>
      </div>
    </aside>
  );
};

export default VerticalNavbar;
