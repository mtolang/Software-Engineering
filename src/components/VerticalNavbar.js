import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../styles/components/verticalnavbar.css";
import logo from "../assets/nobglogo.png";
import userImage from "../assets/logo.png";
import { FaCalendarAlt, FaPoll, FaDonate, FaUserFriends, FaSignOutAlt } from "react-icons/fa";

const VerticalNavbar = () => {
  const [adminData, setAdminData] = useState({
    FullName: "Loading...",
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
          const admin = JSON.parse(storedAdmin);

          const adminDocRef = doc(db, "admin", admin.adminID);
          const adminDoc = await getDoc(adminDocRef);

          if (adminDoc.exists()) {
            const adminDetails = adminDoc.data();
            const fullName = `${adminDetails.FName || ""} ${adminDetails.MName || ""} ${adminDetails.LName || ""}`.trim();
            setAdminData({
              FullName: fullName || "No Name Found",
            });
          } else {
            setAdminData({
              FullName: "Admin not found",
            });
          }
        } else {
          setAdminData({
            FullName: "No Admin Logged In",
          });
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setAdminData({
          FullName: "Error loading admin data",
        });
      }
    };

    fetchAdminData();
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Alumni Portal Logo" className="logo" />
        <h2 className="portal-title">ALUMNI PORTAL</h2>
      </div>

      <nav className="nav-links">
        <div className="nav-section">
          <span className="section-title">GENERAL</span>
          <NavLink to="/events" className="nav-item" activeClassName="active">
            <FaCalendarAlt className="nav-icon" /> Events
          </NavLink>
          <NavLink to="/adminsurvey" className="nav-item" activeClassName="active">
            <FaPoll className="nav-icon" /> Survey
          </NavLink>
          <NavLink to="/donations" className="nav-item" activeClassName="active">
            <FaDonate className="nav-icon" /> Donations
          </NavLink>
        </div>

        <div className="nav-section">
          <span className="section-title">USER MANAGEMENT</span>
          <NavLink to="/adminalumni" className="nav-item" activeClassName="active">
            <FaUserFriends className="nav-icon" /> Alumni
          </NavLink>
          <NavLink to="/adminlogin" className="nav-item" activeClassName="active">
            <FaSignOutAlt className="nav-icon" /> Logout
          </NavLink>
        </div>
      </nav>

      <div className="user-profile">
        <img src={userImage} alt="User Profile" className="user-avatar" />
        <div className="user-info">
          <p className="user-name">{adminData.FullName}</p>
          <p className="user-role">Alumni Coordinator</p>
        </div>
      </div>
    </aside>
  );
};

export default VerticalNavbar;