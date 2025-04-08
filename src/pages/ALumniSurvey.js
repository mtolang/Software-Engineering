import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firestore configuration
import "../styles/AlumniSurvey.css";
import Navbar from "../components/Navbar";

const AlumniSurvey = () => {
  const [surveyData, setSurveyData] = useState([]); // State to store survey data

  // Fetch survey data from Firestore
  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "survey"));
        const surveyList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSurveyData(surveyList); // Store fetched survey data in state
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    };

    fetchSurveyData();
  }, []);

  return (
    <div className="alumnisurvey-homebox">
      <Navbar />

      {/* Display Survey Data */}
      <div className="alumnisurvey-content">
        <h1>Available Surveys</h1>
        <ul>
          {surveyData.map((survey) => (
            <li key={survey.id} className="survey-item">
              <h2>{survey.SurveyTitle || "Untitled Survey"}</h2>
              <p>{survey.Description || "No description available."}</p>
              <a
                href={survey.Link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="survey-link"
              >
                Take Survey
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlumniSurvey;