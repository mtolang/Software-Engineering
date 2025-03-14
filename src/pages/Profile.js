import React, { useState, useEffect } from 'react';
import { db } from "../firebaseConfig"; // Import the Firestore configuration
import { doc, getDoc } from "firebase/firestore";
import '../styles/profile.css';
import Navbar from "../components/Navbar"; // Import the Navbar component

const Profile = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('personal');

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = localStorage.getItem("user");
            if (userData) {
                const user = JSON.parse(userData);
                const userDoc = await getDoc(doc(db, "alumni", user.id));
                if (userDoc.exists()) {
                    setUser(userDoc.data());
                }
            }
        };
        fetchUserData();
    }, []);

    const renderPersonalInfo = () => (
        <div className="details-section">
            <label>LRN Number</label>
            <input type="text" name="lrnNumber" value={user.lrnNumber || ''} readOnly />

            <label>ACR Number (for foreign student only)</label>
            <input type="text" name="acrNumber" value={user.acrNumber || ''} readOnly />

            <label>ID Number</label>
            <input type="text" name="idNumber" value={user.id} readOnly />

            <label>Last Name</label>
            <input type="text" name="lastName" value={user.name.split(' ')[0]} readOnly />

            <label>First Name</label>
            <input type="text" name="firstName" value={user.name.split(' ')[1]} readOnly />

            <label>Middle Name</label>
            <input type="text" name="middleName" value={user.middleName || ''} readOnly />

            <label>Suffix</label>
            <input type="text" name="suffix" value={user.suffix || ''} readOnly />

            <label>Gender</label>
            <input type="text" name="gender" value={user.gender || ''} readOnly />

            <label>Date of Birth</label>
            <input type="date" name="dob" value={user.dob || ''} readOnly />

            <label>Place of Birth</label>
            <input type="text" name="placeOfBirth" value={user.placeOfBirth || ''} readOnly />
        </div>
    );

    const renderParentInfo = () => (
        <div className="details-section">
            {/* Add parent information fields here */}
        </div>
    );

    const renderGuardianInfo = () => (
        <div className="details-section">
            {/* Add guardian information fields here */}
        </div>
    );

    const renderEducationalBackground = () => (
        <div className="details-section">
            {/* Add educational background fields here */}
        </div>
    );

    return (
        <div className="profile-container">
            <Navbar /> {/* Navbar at the top */}

            <div className="profile-content">
                <h2>Profile</h2>
                <div className="tabs">
                    <button className={activeTab === 'personal' ? 'active' : ''} onClick={() => setActiveTab('personal')}>Personal Information</button>
                    <button className={activeTab === 'parent' ? 'active' : ''} onClick={() => setActiveTab('parent')}>Parent Information</button>
                    <button className={activeTab === 'guardian' ? 'active' : ''} onClick={() => setActiveTab('guardian')}>Guardian Information</button>
                    <button className={activeTab === 'education' ? 'active' : ''} onClick={() => setActiveTab('education')}>Educational Background</button>
                </div>

                {user && (
                    <div className="tab-content">
                        {activeTab === 'personal' && renderPersonalInfo()}
                        {activeTab === 'parent' && renderParentInfo()}
                        {activeTab === 'guardian' && renderGuardianInfo()}
                        {activeTab === 'education' && renderEducationalBackground()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;