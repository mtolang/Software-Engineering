import React, { useState, useEffect } from 'react';
import { db } from "../firebaseConfig"; // Import the Firestore configuration
import { doc, updateDoc } from "firebase/firestore";
import '../styles/components/editprof.css';

const EditProfile = ({ user, userDocRef, onClose }) => {
    const [formData, setFormData] = useState(user);

    useEffect(() => {
        setFormData(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSave = async () => {
        if (userDocRef) {
            try {
                await updateDoc(userDocRef, formData);
                localStorage.setItem("user", JSON.stringify(formData));
                alert("Profile updated successfully!");
                onClose();
            } catch (error) {
                console.error("Error updating profile: ", error);
                alert("Failed to update profile. Please try again.");
            }
        } else {
            alert("User document reference is missing. Cannot update profile.");
        }
    };

    return (
        <div className="editprof-modal-overlay">
            <div className="editprof-modal-content">
                <button className="editprof-close-btn" onClick={onClose}>X</button>
                <h2>Edit Profile</h2>
                <div className="editprof-details-section">
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />

                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />

                    <label>Year Graduated</label>
                    <input type="text" name="year_graduated" value={formData.year_graduated} onChange={handleChange} />

                    <label>Course Graduated</label>
                    <input type="text" name="course_graduated" value={formData.course_graduated} onChange={handleChange} />

                    <label>Job Title</label>
                    <input type="text" name="jobTitle" value={formData.jobTitle || ''} onChange={handleChange} />

                    <label>Contact Number</label>
                    <input type="text" name="contactNumber" value={formData.contactNumber || ''} onChange={handleChange} />

                    <label>Current Address</label>
                    <textarea name="current_address" value={formData.current_address || ''} onChange={handleChange}></textarea>
                </div>
                <div className="editprof-button-section">
                    <button className="editprof-save-btn" onClick={handleSave}>Save</button>
                    <button className="editprof-close-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;