import React, { useState } from "react";
import "../styles/components/AdminSurveyModal.css";

const AdminSurveyModal = ({ survey, onClose, onSave }) => {
  const [formData, setFormData] = useState(survey);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Survey</h2>
        <label>Survey Title</label>
        <input
          type="text"
          name="surveyTitle"
          value={formData.surveyTitle}
          onChange={handleInputChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />

        <label>Tags</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
        />

        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AdminSurveyModal;