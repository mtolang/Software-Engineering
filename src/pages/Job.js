// filepath: c:\Users\My PC\Desktop\PracticeJS\se-project\src\pages\Job.js
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // Assuming you have a vertical navbar component
import JobModal from "../components/JobModal"; // Import the JobModal component
import { db } from "../firebaseConfig"; // Import Firestore database
import { collection, getDocs } from "firebase/firestore";
import "../styles/job.css"; // Assuming you have a separate CSS file for styling

const Job = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobPositions, setJobPositions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobPositions(jobs);
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobPositions.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddJob = () => {
    setIsModalOpen(true);
  };

  const handleSaveJob = (newJob) => {
    setJobPositions([...jobPositions, newJob]);
  };

  return (
    <div className="job-container">
      <Navbar />
      <div className="job-content">
        <h1>Open Job Positions</h1>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search job titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="add-job-button" onClick={handleAddJob}>
            Add Job
          </button>
        </div>
        <div className="job-list">
          {filteredJobs.map((job, index) => (
            <div key={index} className="job-card">
              <div className="job-info">
                <h2>{job.title}</h2>
                <p>{job.company}</p>
                <p>{job.location}</p>
              </div>
              <div className="job-details">
                <p>{job.date}</p>
                <p>No of vacancies: {job.vacancies}</p>
                <button
                  className="apply-button"
                  onClick={() => window.open(job.link, "_blank")}
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveJob}
      />
    </div>
  );
};

export default Job;