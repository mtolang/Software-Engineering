import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore functions

const Profile = ({ userEmail }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const docRef = doc(db, "alumni", userEmail);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProfile(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, [userEmail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleEdit = async () => {
        if (isEditing) {
            // Save the updated profile to Firestore
            try {
                const docRef = doc(db, "alumni", userEmail);
                await updateDoc(docRef, profile);
                console.log("Profile updated successfully!");
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }
        setIsEditing(!isEditing);
    };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="h-screen bg-pink-500 flex items-center justify-center">
            <div className="bg-pink-300 w-full max-w-2xl p-8 rounded-lg shadow-lg">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold">My Account</h1>
                </div>

                <div className="flex items-center gap-4 mb-4">
                    <img src="/path-to-profile-image.jpg" alt="Profile" className="w-16 h-16 rounded-full" />
                    <p className="font-bold">Hi, <span className="font-extrabold">{profile.name?.toUpperCase()}!</span></p>
                </div>

                {/* Profile Fields */}
                {Object.entries(profile).map(([key, value]) => (
                    <div key={key} className="mb-4">
                        <label className="block text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name={key}
                                value={value}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        ) : (
                            <p className="p-2 border rounded-md bg-white">{value}</p>
                        )}
                    </div>
                ))}

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                    <button onClick={handleEdit} className="py-2 px-4 bg-black text-white rounded-md">
                        {isEditing ? 'Save' : 'Modify'}
                    </button>
                    <button onClick={() => navigate('/Login')} className="py-2 px-4 bg-white text-black rounded-md border border-black">Sign out</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
