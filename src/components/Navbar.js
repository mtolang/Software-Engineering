import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/nobglogo.png";
import "../styles/components/navbar.css"; // Import CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown")) {
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
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* Center - Title and Navigation */}
      <div className="navbar-center">
        <h1 className="navbar-title">ALUMNI PORTAL</h1>
        <div className="navbar-links">
          <Link to="/" className="nav-link">HOME</Link>

          {/* Account Dropdown */}
          <div className="dropdown">
            <button onClick={(e) => { e.stopPropagation(); toggleDropdown("account"); }} className="dropdown-btn">
              ACCOUNT ▼
            </button>
            {dropdown === "account" && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item">View Profile</Link>
                <Link to="/manage-alumni" className="dropdown-item">Manage Alumni</Link>
              </div>
            )}
          </div>

          {/* Alumni Updates Dropdown */}
          <div className="dropdown">
            <button onClick={(e) => { e.stopPropagation(); toggleDropdown("updates"); }} className="dropdown-btn">
              ALUMNI UPDATES ▼
            </button>
            {dropdown === "updates" && (
              <div className="dropdown-menu">
                <Link to="/alumni-status" className="dropdown-item">Alumni Status</Link>
                <Link to="/alumni-achievements" className="dropdown-item">Alumni Achievements</Link>
              </div>
            )}
          </div>

          {/* Reports Dropdown */}
          <div className="dropdown">
            <button onClick={(e) => { e.stopPropagation(); toggleDropdown("reports"); }} className="dropdown-btn">
              REPORTS ▼
            </button>
            {dropdown === "reports" && (
              <div className="dropdown-menu">
                <Link to="/news-events" className="dropdown-item">News & Events</Link>
                <Link to="/alumni-survey" className="dropdown-item">Alumni Survey</Link>
                <Link to="/report-data" className="dropdown-item">Reports</Link>
              </div>
            )}
          </div>

          {/* Chats */}
          <Link to="/chats" className="nav-link">CHATS</Link>

          {/* Job Posting Dropdown */}
          <div className="dropdown">
            <button onClick={(e) => { e.stopPropagation(); toggleDropdown("jobs"); }} className="dropdown-btn">
              JOB POSTING ▼
            </button>
            {dropdown === "jobs" && (
              <div className="dropdown-menu">
                <Link to="/post-job" className="dropdown-item">Post a Job</Link>
                <Link to="/find-job" className="dropdown-item">Look for a Job</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Log Out Button */}
      <button className="logout-btn" onClick={() => navigate("/login")}>
        LOG OUT
      </button>
    </nav>
  );
};

export default Navbar;
