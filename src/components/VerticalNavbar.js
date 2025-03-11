import React from "react";
import { NavLink } from "react-router-dom";
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
          <NavLink to="/events" className="nav-item" activeClassName="active">Events</NavLink>
          <NavLink to="/survey" className="nav-item" activeClassName="active">Survey</NavLink>
          <NavLink to="/donations" className="nav-item" activeClassName="active">Donations</NavLink>
        </div>

        <div className="nav-section">
          <span className="section-title">USER MANAGEMENT</span>
          <NavLink to="/adminalumni" className="nav-item" activeClassName="active">Alumni</NavLink>
          <NavLink to="/adminregistrants" className="nav-item" activeClassName="active">Registrants</NavLink>
          <NavLink to="/adminlogin" className="nav-item" activeClassName="active">Logout</NavLink>
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="user-profile">
        <img src={userImage} alt="User Profile" className="user-avatar" />
        <div className="user-info">
          <p className="user-name">Martin Rey Tolang</p>
          <p className="user-role">Alumni Coordinator</p>
        </div>
      </div>
    </aside>
  );
};

export default VerticalNavbar;
