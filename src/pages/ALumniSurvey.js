import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import Firestore configuration
import "../styles/AlumniSurvey.css";
import Navbar from "../components/Navbar";

const AlumniSurvey = () => {
  const [surveyData, setSurveyData] = useState([]); // State to store survey data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        // Get user role from local storage
        const userData = JSON.parse(localStorage.getItem("user"));
        const userRole = userData?.roles;

        if (!userRole) {
          console.error("User role is missing in local storage.");
          setLoading(false);
          return;
        }

        // Query surveys based on user role
        const surveyQuery = query(
          collection(db, "survey"),
          where("Tags", "==", userRole) // Match user role
        );

        const querySnapshot = await getDocs(surveyQuery);
        const surveyList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Add surveys with the "ALL" tag
        const allSurveysQuery = query(
          collection(db, "survey"),
          where("Tags", "==", "ALL") // Match "ALL" tag
        );
        const allSurveysSnapshot = await getDocs(allSurveysQuery);
        const allSurveysList = allSurveysSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Combine both lists
        setSurveyData([...surveyList, ...allSurveysList]);
      } catch (error) {
        console.error("Error fetching survey data:", error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchSurveyData();
  }, []); // Run once on component mount

  return (
    <div className="alumnisurvey-homebox">
      <Navbar />

      {/* Display Survey Data */}
      <div className="alumnisurvey-content">
        <h1>Available Surveys</h1>
        {loading ? (
          <p>Loading...</p>
        ) : surveyData.length > 0 ? (
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
        ) : (
          <p>No surveys available for your role.</p>
        )}
      </div>
    </div>
  );
};

export default AlumniSurvey;