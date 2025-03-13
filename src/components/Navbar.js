import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/nobglogo.png";
import JobModal from "../components/JobModal"; // Import the JobModal component
import "../styles/components/navbar.css"; // Import CSS file

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAddJob = () => {
    setIsModalOpen(true);
  };

  const handleSaveJob = (newJob) => {
    // Implement save job functionality here
    console.log("Saving new job:", newJob);
  };

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
          <div className="navbar-dropdown">
            <button onClick={(e) => { e.stopPropagation(); toggleDropdown("reports"); }} className="navbar-dropdown-btn">
              REPORTS ▼
            </button>
            {dropdown === "reports" && (
              <div className="navbar-dropdown-menu">
                <Link to="/newsevents" className="navbar-dropdown-item">News & Events</Link>
                <Link to="/alumnisurvey" className="navbar-dropdown-item">Alumni Survey</Link>
              </div>
            )}
          </div>

          {/* Chats */}
          <Link to="/chats" className="navbar-nav-link">CHATS</Link>

          {/* Job Posting Dropdown */}
          <div className="navbar-dropdown">
            <button onClick={(e) => { e.stopPropagation(); toggleDropdown("jobs"); }} className="navbar-dropdown-btn">
              JOB POSTING ▼
            </button>
            {dropdown === "jobs" && (
              <div className="navbar-dropdown-menu">
                <button onClick={handleAddJob} className="navbar-dropdown-item">Post a Job</button>
                <Link to="/job" className="navbar-dropdown-item">Look for a Job</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Alumni Profile Dropdown */}
      <div className="navbar-dropdown">
        <button onClick={(e) => { e.stopPropagation(); toggleDropdown("profile"); }} className="navbar-dropdown-btn">
          {user ? `${user.name} ▼` : "ALUMNI PROFILE ▼"}
        </button>
        {dropdown === "profile" && (
          <div className="navbar-dropdown-menu">
            <Link to="/profile" className="navbar-dropdown-item">Edit Profile</Link>
            <button className="navbar-dropdown-item" onClick={() => navigate("/login")}>Sign Out</button>
          </div>
        )}
      </div>

      {/* Job Modal */}
      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveJob}
      />
    </nav>
  );
};

export default Navbar;