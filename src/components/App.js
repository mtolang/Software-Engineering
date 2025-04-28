import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

// Alumni Pages
import AlumniProfile from "../pages/MyAccount";
import Job from "../pages/Job";
import NewsEvents from "../pages/NewsEvents";
import AlumniSurvey from "../pages/ALumniSurvey";
import AchievementStatus from '../pages/AchievementStatus'; //

// Administrator Pages
import AdminLogin from "../pages/AdminLogin";
import AdminRegistrants from "../pages/AdminRegistrants";
import AdminAlumni from "../pages/AdminAlumni";
import AdminEvents from "../pages/AdminEvents";
import AdminDonations from "../pages/AdminDonations";
import AdminSurvey from "../pages/AdminSurvey";
import ChatStatic from "../pages/Chats";

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
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Alumni Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<AlumniProfile userEmail={userEmail} />} />
        <Route path="/job" element={<Job />} />
        <Route path="/newsevents" element={<NewsEvents />} />
        <Route path="/alumnisurvey" element={<AlumniSurvey />} />
        <Route path="/achievements" element={<AchievementStatus />} />

        {/* Administrator Routes */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminregistrants" element={<AdminRegistrants />} />
        <Route path="/adminalumni" element={<AdminAlumni />} />
        <Route path="/events" element={<AdminEvents />} />
        <Route path="/donations" element={<AdminDonations />} />
        <Route path="/adminsurvey" element={<AdminSurvey />} />
        <Route path="/chats" element={<ChatStatic />} />
      </Routes>
    </Router>
  );
};

export default App;