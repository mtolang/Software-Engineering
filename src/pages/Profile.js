import React, { useState, useEffect } from 'react';
import { db } from "../firebaseConfig"; // Import the Firestore configuration
import { doc, getDoc, updateDoc } from "firebase/firestore";
import '../styles/profile.css';
import Navbar from "../components/Navbar"; // Import the Navbar component

const Profile = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('personal');
    const [formData, setFormData] = useState({}); // State to hold editable form data

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = localStorage.getItem("user");
            if (userData) {
                const user = JSON.parse(userData);
                const userDoc = await getDoc(doc(db, "alumni", user.id));
                if (userDoc.exists()) {
                    setUser(userDoc.data());
                    setFormData(userDoc.data()); // Initialize form data with user data
                }
            }
        };
        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        if (user) {
            try {
                const userRef = doc(db, "alumni", user.id);
                await updateDoc(userRef, formData); // Update the database with the new data
                alert("Profile updated successfully!");
            } catch (error) {
                console.error("Error updating profile:", error);
                alert("Failed to update profile. Please try again.");
            }
        }
    };

    const renderPersonalInfo = () => (
        <div className="details-section">
            <label>LRN Number</label>
            <input
                type="text"
                name="lrnNumber"
                value={formData.lrnNumber || ''}
                onChange={handleInputChange}
            />

            <label>ACR Number (for foreign student only)</label>
            <input
                type="text"
                name="acrNumber"
                value={formData.acrNumber || ''}
                onChange={handleInputChange}
            />

            <label>ID Number</label>
            <input
                type="text"
                name="id"
                value={formData.id || ''}
                onChange={handleInputChange}
            />

            <label>Last Name</label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleInputChange}
            />

            <label>First Name</label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleInputChange}
            />

            <label>Middle Name</label>
            <input
                type="text"
                name="middleName"
                value={formData.middleName || ''}
                onChange={handleInputChange}
            />

            <label>Suffix</label>
            <input
                type="text"
                name="suffix"
                value={formData.suffix || ''}
                onChange={handleInputChange}
            />

            <label>Gender</label>
            <input
                type="text"
                name="gender"
                value={formData.gender || ''}
                onChange={handleInputChange}
            />

            <label>Date of Birth</label>
            <input
                type="date"
                name="dob"
                value={formData.dob || ''}
                onChange={handleInputChange}
            />

            <label>Place of Birth</label>
            <input
                type="text"
                name="placeOfBirth"
                value={formData.placeOfBirth || ''}
                onChange={handleInputChange}
            />
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

                {/* Update Button */}
                <div className="update-button-container">
                    <button onClick={handleUpdate}>Update</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;