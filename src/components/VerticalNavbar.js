import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../styles/components/verticalnavbar.css";
import logo from "../assets/nobglogo.png";
import userImage from "../assets/logo.png";

const VerticalNavbar = () => {
  const [adminData, setAdminData] = useState({
    FullName: "Loading...",
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      const storedAdmin = localStorage.getItem("admin");
      if (storedAdmin) {
        const admin = JSON.parse(storedAdmin);
        const adminDoc = await getDoc(doc(db, "admin", admin.adminID.toString())); // Fetch admin details using adminID
        if (adminDoc.exists()) {
          const adminDetails = adminDoc.data();
          const fullName = `${adminDetails.FName || ""} ${adminDetails.MName || ""} ${adminDetails.LName || ""}`.trim();
          setAdminData({
            FullName: fullName || "No Name Found",
          });
        }
      }
    };

    fetchAdminData();
  }, []);

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
          <NavLink to="/events" className="nav-item" activeClassName="active">
            Events
          </NavLink>
          <NavLink to="/adminsurvey" className="nav-item" activeClassName="active">
            Survey
          </NavLink>
          <NavLink to="/donations" className="nav-item" activeClassName="active">
            Donations
          </NavLink>
        </div>

        <div className="nav-section">
          <span className="section-title">USER MANAGEMENT</span>
          <NavLink to="/adminalumni" className="nav-item" activeClassName="active">
            Alumni
          </NavLink>
          <NavLink to="/adminlogin" className="nav-item" activeClassName="active">
            Logout
          </NavLink>
        </div>
      </nav>

      {/* User Profile Section */}
      <div className="user-profile">
        <img src={userImage} alt="User Profile" className="user-avatar" />
        <div className="user-info">
          <p className="user-name">{adminData.FullName}</p>
          <p className="user-role">Administrator</p>
        </div>
      </div>
    </aside>
  );
};

export default VerticalNavbar;