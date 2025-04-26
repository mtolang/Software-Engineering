import React, { useState, useEffect } from 'react';
import '../styles/MyAccount.css';
import Navbar from "../components/Navbar";
import profilepic from '../assets/profile.webp';
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AchievementStatus from './AchievementStatus';

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [userDocRef, setUserDocRef] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false); // Track if editing mode is active
    const [updatedUser, setUpdatedUser] = useState({}); // Store updated user data

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = localStorage.getItem("user");
            if (userData) {
                const user = JSON.parse(userData);
                if (user.alumni_id) {
                    const userDocRef = doc(db, "alumni", user.alumni_id);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setUser(userDoc.data());
                        setUpdatedUser(userDoc.data()); // Initialize updatedUser with current user data
                        setUserDocRef(userDocRef);
                    } else {
                        console.error("No such document!");
                    }
                } else {
                    console.error("alumni_id is missing in user data");
                }
            } else {
                console.error("No user data in local storage");
            }
        };
        fetchUserData();
    }, []);

    const handleSaveChanges = async () => {
        try {
            if (userDocRef) {
                await updateDoc(userDocRef, updatedUser);
                setUser(updatedUser); // Update the user state with the new data
                localStorage.setItem("user", JSON.stringify(updatedUser)); // Update local storage
                setIsEditing(false); // Exit editing mode
            } else {
                console.error("User document reference is missing");
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const renderProfile = () => (
        <div className="details-section">
            <label>Name</label>
            <input
                type="text"
                name="name"
                value={updatedUser.name || ""}
                onChange={handleInputChange}
                disabled={!isEditing} // Disable input if not in editing mode
            />

            <label>Email</label>
            <input
                type="email"
                name="email"
                value={updatedUser.email || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
            />

            <label>Year Graduated</label>
            <input
                type="text"
                name="year_graduated"
                value={updatedUser.year_graduated || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
            />

            <label>Job Title</label>
            <input
                type="text"
                name="jobTitle"
                value={updatedUser.jobTitle || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
            />

            <label>Contact Number</label>
            <input
                type="text"
                name="contactNumber"
                value={updatedUser.contactNumber || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
            />

            <label>Current Address</label>
            <textarea
                name="current_address"
                value={updatedUser.current_address || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
            ></textarea>

            <div className="button-section">
                {!isEditing ? (
                    <button
                        className="modify-btn"
                        onClick={() => setIsEditing(true)} // Enable editing mode
                    >
                        Modify
                    </button>
                ) : (
                    <button
                        className="save-btn"
                        onClick={handleSaveChanges} // Save changes to the database
                    >
                        Save Changes
                    </button>
                )}
            </div>
        </div>
    );

    const renderAchievements = () => (
        <div className="achievements-section">
            <AchievementStatus />
        </div>
    );

    return (
        <div className="homebox">
            <Navbar />

            <div className="account-container">
                <h2>My Account</h2>
                <div className="profilepic">
                    <img src={profilepic} alt="" className="profile-pic" />
                    {user && <h2>Hi, <strong>{user.name.split(' ')[0].toUpperCase()}!</strong></h2>}
                </div>

                <div className="tabs">
                    <button
                        className={activeTab === 'profile' ? 'active' : ''}
                        onClick={() => setActiveTab('profile')}
                    >
                        Profile
                    </button>
                    <button
                        className={activeTab === 'achievements' ? 'active' : ''}
                        onClick={() => setActiveTab('achievements')}
                    >
                        Achievements
                    </button>
                </div>

                {user && (activeTab === 'profile' ? renderProfile() : renderAchievements())}

                <button
                    className="signout-btn"
                    onClick={() => {
                        localStorage.removeItem("user");
                        window.location.href = "/login";
                    }}
                >
                    Sign out
                </button>
            </div>
        </div>
    );
};

export default MyAccount;