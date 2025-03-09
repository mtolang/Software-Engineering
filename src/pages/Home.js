import React from "react";
import Navbar from "../components/Navbar"; // ✅ Import the Navbar component
import "../styles/home.css"; // ✅ Import the separate CSS file

const HomePage = () => {
  return (
    <div className="homebox">
      <Navbar /> {/* ✅ Navbar at the top */}
      
      <div className="welcome-section">
        <h1>Welcome to Alumni Portal</h1>
      </div>
      
      <footer className="footer">
        <p>© 2025 Alumni Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
