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
      <h2 className="modal-title">Edit Job</h2>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={updatedJob.title || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={updatedJob.company || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={updatedJob.location || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={updatedJob.date || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="vacancies">Vacancies</label>
        <input
          type="number"
          id="vacancies"
          name="vacancies"
          value={updatedJob.vacancies || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="link">Link</label>
        <input
          type="text"
          id="link"
          name="link"
          value={updatedJob.link || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="modal-buttons">
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditJobModal;