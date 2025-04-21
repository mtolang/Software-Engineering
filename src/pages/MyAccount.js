import React, { useState, useEffect } from 'react';
import '../styles/MyAccount.css';
import Navbar from "../components/Navbar"; // ✅ Import the Navbar component
import profilepic from '../assets/profile.webp';
import EditProfile from '../components/editprof.js'; // Import the EditProfile component
import { db } from "../firebaseConfig"; // Import the Firestore configuration
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Import updateDoc
import AchievementStatus from './AchievementStatus'; // Import AchievementStatus component

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [userDocRef, setUserDocRef] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('dashboard'); // Example state to track the current page

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = localStorage.getItem("user");
            if (userData) {
                const user = JSON.parse(userData);
                if (user.alumni_id) {
                    const userDocRef = doc(db, "alumni", user.alumni_id); // Use alumni_id as document ID
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setUser(userDoc.data());
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

    const handleSave = async (updatedUser) => {
        try {
            if (userDocRef) {
                await updateDoc(userDocRef, updatedUser);
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setIsEditModalOpen(false);
            } else {
                console.error("User document reference is missing");
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const renderProfile = () => (
        <div className="details-section">
            <label>Name</label>
            <input type="text" name="name" value={user.name} readOnly/>

            <label>Email</label>
            <input type="email" name="email" value={user.email} readOnly/>

            <label>Year Graduated</label>
            <input type="text" name="year_graduated" value={user.year_graduated} readOnly/>

            <label>Job title</label>
            <input type="text" name="jobTitle" value={user.jobTitle} readOnly/>

            <label>Contact number</label>
            <input type="text" name="contactNumber" value={user.contactNumber} readOnly/>

            <label>Current address</label>
            <textarea name="current_address" value={user.current_address} readOnly></textarea>

            <div className="flex justify-between mt-4">
                <button
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-full"
                    onClick={() => setActiveTab('achievements')} // Navigate back to Achievements
                >
                    ← Back
                </button>
                <button
                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full"
                    onClick={() => setIsEditModalOpen(true)} // Open the edit modal
                >
                    Modify
                </button>
            </div>
        </div>
    );

    const renderAchievements = () => (
        <div className="achievements-section">
            <AchievementStatus /> {/* Render AchievementStatus component */}
        </div>
    );

    const navigateToAchievements = () => {
        setCurrentPage('achievements');
        setActiveTab('achievements');
    };

    return (
        <div className="homebox">
            <Navbar /> {/* ✅ Navbar at the top */}

            <div className="account-container">
                <h2>My Account</h2>
                <div className="profilepic">
                    <img src={profilepic} alt="" className="profile-pic" />
                    {user && <h2>Hi, <strong>{user.name.split(' ')[0].toUpperCase()}!</strong></h2>}
                </div>

                <div className="tabs">
                    <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>Profile</button>
                    <button className={activeTab === 'achievements' ? 'active' : ''} onClick={navigateToAchievements}>Achievements</button>
                </div>

                {user && (activeTab === 'profile' ? renderProfile() : renderAchievements())}

                {currentPage !== 'achievements' && (
                    <div className="button-section">
                        <button className="modify-btn" onClick={() => setIsEditModalOpen(true)}>Modify</button>
                        <button className="signout-btn" onClick={() => {
                            localStorage.removeItem("user");
                            window.location.href = "/login";
                        }}>Sign out</button>
                    </div>
                )}
            </div>

            {isEditModalOpen && <EditProfile user={user} userDocRef={userDocRef} onSave={handleSave} onClose={() => setIsEditModalOpen(false)} />}
        </div>
    );
};

export default MyAccount;