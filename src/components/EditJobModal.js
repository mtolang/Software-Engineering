import React, { useState } from "react";
import "../styles/components/editjobmodal.css";

const EditJobModal = ({ job, onClose, onSave }) => {
  const [updatedJob, setUpdatedJob] = useState(job);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(updatedJob);
  };

  return (
    <div className="edit-job-modal">
      <div className="modal-content">
        <h2>Edit Job</h2>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={updatedJob.title || ""}
          onChange={handleInputChange}
        />
        <label>Company</label>
        <input
          type="text"
          name="company"
          value={updatedJob.company || ""}
          onChange={handleInputChange}
        />
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={updatedJob.location || ""}
          onChange={handleInputChange}
        />
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={updatedJob.date || ""}
          onChange={handleInputChange}
        />
        <label>Vacancies</label>
        <input
          type="number"
          name="vacancies"
          value={updatedJob.vacancies || ""}
          onChange={handleInputChange}
        />
        <label>Link</label>
        <input
          type="text"
          name="link"
          value={updatedJob.link || ""}
          onChange={handleInputChange}
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditJobModal;