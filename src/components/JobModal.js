import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../styles/components/jobmodal.css"; 

const JobModal = ({ isOpen, onClose, onSave }) => {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    company: "",
    location: "",
    date: "",
    vacancies: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSave = async () => {
    try {
      await addDoc(collection(db, "jobs"), {
        ...jobDetails,
        date_posted: new Date(),
      });
      onSave(jobDetails);
      onClose();
    } catch (error) {
      console.error("Error adding job: ", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Job</h2>
        <div className="modal-body">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={jobDetails.title}
            onChange={handleChange}
          />
          <label>Company</label>
          <input
            type="text"
            name="company"
            value={jobDetails.company}
            onChange={handleChange}
          />
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={jobDetails.location}
            onChange={handleChange}
          />
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={jobDetails.date}
            onChange={handleChange}
          />
          <label>Vacancies</label>
          <input
            type="number"
            name="vacancies"
            value={jobDetails.vacancies}
            onChange={handleChange}
          /><label>Company Link</label>
          <input
            type="text"
            name="link"
            value={jobDetails.link}
            onChange={handleChange}
          />
        </div>
        <div className="modal-footer">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;