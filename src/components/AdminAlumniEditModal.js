import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import "../styles/components/adminalumnimodal.css";

const AdminAlumniEditModal = ({ isOpen, onClose, alumni }) => {
  console.log("Edit Modal Open:", isOpen); // Debugging
  console.log("Alumni Data in Edit Modal:", alumni); // Debugging

  // Initialize state unconditionally
  const [editedAlumni, setEditedAlumni] = useState(alumni || {});

  if (!isOpen || !alumni) return null;

  const handleSave = async () => {
    try {
      const alumniRef = doc(db, "alumni", alumni.id);
      await updateDoc(alumniRef, editedAlumni);
      alert("Alumni details updated!");
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
          <input type="text" name="name" value={editedAlumni.name || ""} onChange={handleChange} />
          <label>Email:</label>
          <input type="text" name="email" value={editedAlumni.email || ""} onChange={handleChange} />
          <label>Course Graduated:</label>
          <input type="text" name="course_graduated" value={editedAlumni.course_graduated || ""} onChange={handleChange} />
          <label>Current Address:</label>
          <input type="text" name="current_address" value={editedAlumni.current_address || ""} onChange={handleChange} />
          <label>Date Registered:</label>
          <input type="text" name="date_registered" value={editedAlumni.date_registered || ""} onChange={handleChange} />
          <label>Year Graduated:</label>
          <input type="text" name="year_graduated" value={editedAlumni.year_graduated || ""} onChange={handleChange} />
        </div>
        <div className="adminalumni-modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AdminAlumniEditModal;