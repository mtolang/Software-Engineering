import React, { useState } from "react";
import AdminAlumniEditModal from "./AdminAlumniEditModal";
import "../styles/components/adminalumnimodal.css"; // Separate CSS for this modal

const AdminAlumniModal = ({ isOpen, onClose, alumni }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!isOpen || !alumni) return null;

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  return (
    <div className="adminalumni-modal-overlay">
      <div className="adminalumni-modal-content">
        <h2 className="adminalumni-modal-title">Alumni Details</h2>
        <div className="adminalumni-modal-detail">
          <p><strong>Name:</strong> {alumni.name}</p>
          <p><strong>Email:</strong> {alumni.email}</p>
          <p><strong>Course Graduated:</strong> {alumni.course_graduated}</p>
          <p><strong>Current Address:</strong> {alumni.current_address}</p>
          <p><strong>Date Registered:</strong> {alumni.date_registered}</p>
          <p><strong>Year Graduated:</strong> {alumni.year_graduated}</p>
        </div>
        <div className="adminalumni-modal-actions">
          <button className="adminalumni-modal-edit" onClick={handleEdit}>Edit</button>
          <button className="adminalumni-modal-close" onClick={onClose}>Close</button>
        </div>
      </div>
      <AdminAlumniEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        alumni={alumni}
      />
    </div>
  );
};

export default AdminAlumniModal;
