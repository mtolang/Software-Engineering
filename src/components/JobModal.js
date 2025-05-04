import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../styles/components/jobmodal.css";

const JobModal = ({ isOpen, onClose, onSave }) => {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    company: "",
    location: "",
    vacancies: "",
    link: "",
  });

  useEffect(() => {
    if (isOpen) {
      // Clear all fields when the modal opens
      setJobDetails({
        title: "",
        company: "",
        location: "",
        vacancies: "",
        link: "",
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSave = async () => {
    // Check if all fields are filled
    const { title, company, location, vacancies, link } = jobDetails;
    if (!title || !company || !location || !vacancies || !link) {
      alert("All fields are required to post a job.");
      return;
    }

    try {
      // Get the alumni name from local storage
      const alumniName = localStorage.getItem("alumni_name") || "Unknown Alumni";

      // Save the job details along with the alumni name
      await addDoc(collection(db, "jobs"), {
        ...jobDetails,
        date_posted: new Date().toISOString().split("T")[0], // Automatically set the current date
        alumni_name: alumniName, // Save the alumni name
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
          <label>Vacancies</label>
          <input
            type="number"
            name="vacancies"
            value={jobDetails.vacancies}
            onChange={handleChange}
          />
          <label>Company Link</label>
          <input
            type="text"
            name="link"
            value={jobDetails.link}
            onChange={handleChange}
          />
        </div>
        <div className="modal-footer">
          <button onClick={handleSave}>Post</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;