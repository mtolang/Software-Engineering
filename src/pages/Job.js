import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import JobModal from "../components/JobModal";
import EditJobModal from "../components/EditJobModal";
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc } from "firebase/firestore";
import "../styles/job.css";

const Job = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobPositions, setJobPositions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeTab, setActiveTab] = useState("myJobs"); // Track active tab
  const [myJobs, setMyJobs] = useState([]);

  const alumniName = localStorage.getItem("alumni_name"); // Get alumni name from local storage

  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        let formattedDate;

        // Check if date_posted is a Firestore Timestamp
        if (data.date_posted && typeof data.date_posted.toDate === "function") {
          formattedDate = data.date_posted.toDate().toISOString().split("T")[0];
        } else {
          // If date_posted is already a string or another type, use it directly
          formattedDate = data.date_posted || "Unknown Date";
        }

        return {
          id: doc.id,
          ...data,
          date_posted: formattedDate, // Use the formatted date
        };
      });
      setJobPositions(jobs);

      // Filter jobs posted by the logged-in user
      const userJobs = jobs.filter((job) => job.alumni_name === alumniName);
      setMyJobs(userJobs);
    };

    fetchJobs();
  }, [alumniName]);

  const filteredJobs = jobPositions.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddJob = () => {
    setIsModalOpen(true);
  };

  const handleSaveJob = async (newJob) => {
    try {
      // Save the new job to Firestore
      const jobRef = collection(db, "jobs");
      await addDoc(jobRef, newJob);

      // Refetch jobs after adding a new job
      const querySnapshot = await getDocs(collection(db, "jobs"));
      const jobs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        let formattedDate;

        // Check if date_posted is a Firestore Timestamp
        if (data.date_posted && typeof data.date_posted.toDate === "function") {
          formattedDate = data.date_posted.toDate().toISOString().split("T")[0];
        } else {
          formattedDate = data.date_posted || "Unknown Date";
        }

        return {
          id: doc.id,
          ...data,
          date_posted: formattedDate,
        };
      });

      setJobPositions(jobs);

      // Filter jobs posted by the logged-in user
      const userJobs = jobs.filter((job) => job.alumni_name === alumniName);
      setMyJobs(userJobs);

      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setIsEditModalOpen(true);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await deleteDoc(doc(db, "jobs", jobId));
      setJobPositions(jobPositions.filter((job) => job.id !== jobId));
      setMyJobs(myJobs.filter((job) => job.id !== jobId));
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
      setMyJobs((prevJobs) =>
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
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "myJobs" ? "active" : ""}`}
            onClick={() => setActiveTab("myJobs")}
          >
            My Jobs
          </button>
          <button
            className={`tab-button ${activeTab === "allJobs" ? "active" : ""}`}
            onClick={() => setActiveTab("allJobs")}
          >
            All Jobs
          </button>
        </div>
        <div className="search-section">
          <input
            type="text"
            placeholder="Search job titles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {activeTab === "myJobs" && (
            <button className="add-job-button" onClick={handleAddJob}>
              Add Job
            </button>
          )}
        </div>
        <div className="job-list">
          {(activeTab === "myJobs" ? myJobs : filteredJobs).map((job, index) => (
            <div key={index} className="job-card">
              <div className="job-info">
                <h2>{job.title}</h2>
                <p>{job.company}</p>
                <p>{job.location}</p>
              </div>
              <div className="job-details">
                <p>{job.date_posted}</p>
                <p>No of vacancies: {job.vacancies}</p>
                {activeTab === "allJobs" && (
                  <button
                    className="apply-button"
                    onClick={() => window.open(job.link, "_blank")}
                  >
                    Apply
                  </button>
                )}
                {activeTab === "myJobs" && (
                  <>
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
                  </>
                )}
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