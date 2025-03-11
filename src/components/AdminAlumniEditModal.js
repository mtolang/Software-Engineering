import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore"; // ✅ Firestore functions
import "../styles/components/adminalumnimodal.css"; // Separate CSS for this modal

const AdminAlumniEditModal = ({ isOpen, onClose, alumni }) => {
  const [editedAlumni, setEditedAlumni] = useState(alumni);

  if (!isOpen || !alumni) return null;

  const handleSave = async () => {
    try {
      const alumniRef = doc(db, "alumni", alumni.id);
      await updateDoc(alumniRef, editedAlumni); // ✅ Update alumni details
      alert("Alumni details updated! ✅");
      onClose();
    } catch (error) {
      console.error("Error updating alumni:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAlumni({ ...editedAlumni, [name]: value });
  };

  return (
    <div className="adminalumni-modal-overlay">
      <div className="adminalumni-edit-modal-content">
        <h2 className="adminalumni-modal-title">Edit Alumni Details</h2>
        <div className="adminalumni-modal-detail">
          <label>Name:</label>
          <input type="text" name="name" value={editedAlumni.name} onChange={handleChange} className="adminalumni-modal-box" />
          <label>Email:</label>
          <input type="text" name="email" value={editedAlumni.email} onChange={handleChange} className="adminalumni-modal-box" />
          <label>Course Graduated:</label>
          <input type="text" name="course_graduated" value={editedAlumni.course_graduated} onChange={handleChange} className="adminalumni-modal-box" />
          <label>Current Address:</label>
          <input type="text" name="current_address" value={editedAlumni.current_address} onChange={handleChange} className="adminalumni-modal-box" />
          <label>Date Registered:</label>
          <input type="text" name="date_registered" value={editedAlumni.date_registered} onChange={handleChange} className="adminalumni-modal-box" />
          <label>Year Graduated:</label>
          <input type="text" name="year_graduated" value={editedAlumni.year_graduated} onChange={handleChange} className="adminalumni-modal-box" />
        </div>
        <div className="adminalumni-modal-actions">
          <button className="adminalumni-modal-save" onClick={handleSave}>Save</button>
          <button className="adminalumni-modal-close" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AdminAlumniEditModal;
