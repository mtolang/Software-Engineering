import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ForgotPassword from "../pages/ForgotPassword";
import AdminRegistrants from "../pages/AdminRegistrants";
import AdminLogin from "../pages/AdminLogin";
import AdminAlumni from "../pages/AdminAlumni";
// import AchievementsStatus from "../pages/AchievementStatus";
import AdminEvents from "../pages/AdminEvents";
import AdminDonations from "../pages/AdminDonations";
import ChatStatic from "../pages/Chats";
import AlumniProfile from "../pages/MyAccount";
import Job from "../pages/Job";
import NewsEvents from "../pages/NewsEvents";
import AlumniSurvey from "../pages/ALumniSurvey";

const App = () => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    
    const loggedInUserEmail = "ma@gmail.com"; 
    setUserEmail(loggedInUserEmail);
  }, []);

  if (!userEmail) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <Routes>
        {/* ✅ Default Route Redirects to /login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ✅ Lowercase paths (recommended) */}
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adminregistrants" element={<AdminRegistrants />} />
        <Route path="/adminalumni" element={<AdminAlumni />} />
        {/* <Route path="/achievementsstatus" element={<AchievementsStatus />} /> */}
        <Route path="/events" element={<AdminEvents />} />
        <Route path="/donations" element={<AdminDonations />} />
        <Route path="/chats" element={<ChatStatic />} />
        <Route path="/profile" element={<AlumniProfile userEmail={userEmail} />} />
        <Route path="/job" element={<Job />} />
        <Route path="/newsevents" element={<NewsEvents />} /> 
        <Route path="/alumnisurvey" element={<AlumniSurvey />} />
      </Routes>
    </Router>
  );
};

export default App;
