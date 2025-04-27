import React, { useState } from "react";
import AdminAlumniEditModal from "./AdminAlumniEditModal";
import "../styles/components/adminalumnimodal.css";

const AdminAlumniModal = ({ isOpen, onClose, alumnus }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!isOpen) return null;
  if (!alumnus) return <div>No alumni data available.</div>;

  const handleEdit = () => {
    console.log("Opening Edit Modal"); // Debugging
    setIsEditModalOpen(true);
  };

  return (
    <div className="adminalumni-modal-overlay">
      <div className="adminalumni-modal-content">
        <h2 className="adminalumni-modal-title">Alumni Details</h2>
        <div className="adminalumni-modal-detail">
          <p><strong>Name:</strong> {alumnus.name}</p>
          <p><strong>Email:</strong> {alumnus.email}</p>
          <p><strong>Course Graduated:</strong> {alumnus.course_graduated}</p>
          <p><strong>Current Address:</strong> {alumnus.current_address}</p>
          <p><strong>Date Registered:</strong> {alumnus.date_registered}</p>
          <p><strong>Year Graduated:</strong> {alumnus.year_graduated}</p>
        </div>
        <div className="adminalumni-modal-actions">
          <button className="adminalumni-modal-edit" onClick={handleEdit}>Edit</button>
          <button className="adminalumni-modal-close" onClick={onClose}>Close</button>
        </div>
      </div>
      <AdminAlumniEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        alumni={alumnus} // Pass the correct prop
      />
    </div>
  );
};

export default AdminAlumniModal;