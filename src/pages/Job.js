import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import JobModal from "../components/JobModal";
import EditJobModal from "../components/EditJobModal"; // Import the EditJobModal component
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import "../styles/job.css";

const Job = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobPositions, setJobPositions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setIsEditModalOpen(true);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteDoc(doc(db, "jobs", jobId));
      setJobPositions(jobPositions.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleUpdateJob = async (updatedJob) => {
    try {
      const jobRef = doc(db, "jobs", updatedJob.id);
      await updateDoc(jobRef, updatedJob);
      setJobPositions((prevJobs) =>
        prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating job:", error);
    }
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
                <button
                  className="edit-button"
                  onClick={() => handleEditJob(job)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteJob(job.id)}
                >
                  Delete
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
      {isEditModalOpen && (
        <EditJobModal
          job={selectedJob}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleUpdateJob}
        />
      )}
    </div>
  );
};

export default Job;