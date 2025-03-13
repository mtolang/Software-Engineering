// MyAccount.js
import React, { useState } from 'react';
import '../styles/MyAccount.css';
import Navbar from "../components/Navbar"; // ✅ Import the Navbar component
import profilepic from '../assets/profile.webp';

const MyAccount = () => {
    const [user, setUser] = useState({
        name: "Martin Ray Tolang",
        email: "MTolang123@gmail.com",
        yearGraduated: "2025-2026",
        jobTitle: "Software developer",
        contactNumber: "09220123920",
        address: "477 alley, Kanto papa, Davao City"
    });

    const [activeTab, setActiveTab] = useState('profile');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const renderProfile = () => (
        <div className="details-section">
            <label>Name</label>
            <input type="text" name="name" value={user.name} onChange={handleChange} />

            <label>Email</label>
            <input type="email" name="email" value={user.email} onChange={handleChange} />

            <label>Year Graduated</label>
            <input type="text" name="yearGraduated" value={user.yearGraduated} onChange={handleChange} />

            <label>Job title</label>
            <input type="text" name="jobTitle" value={user.jobTitle} onChange={handleChange} />

            <label>Contact number</label>
            <input type="text" name="contactNumber" value={user.contactNumber} onChange={handleChange} />

            <label>Current address</label>
            <textarea name="address" value={user.address} onChange={handleChange}></textarea>
        </div>
    );

    const renderAchievements = () => (
        <div className="achievements-section">
            {/* Add achievements content here */}
        </div>
    );

    return (
        <div className="homebox">
            <Navbar /> {/* ✅ Navbar at the top */}

            <div className="account-container">
                <h2>My Account</h2>
                <div className="profilepic">
                    <img src={profilepic} alt="" className="profile-pic" />
                    <h2>Hi, <strong>MARTIN RAY!</strong></h2>
                </div>

                <div className="tabs">
                    <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</button>
                    <button className={activeTab === 'achievements' ? 'active' : ''} onClick={() => setActiveTab('achievements')}>Achievements</button>
                </div>

                {activeTab === 'profile' ? renderProfile() : renderAchievements()}

                <div className="button-section">
                    <button className="modify-btn">Modify</button>
                    <button className="signout-btn">Sign out</button>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;