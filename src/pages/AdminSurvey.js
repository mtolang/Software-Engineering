import React, { useState } from "react";
import VNavbar from "../components/VerticalNavbar";
import "../styles/components/AdminSurvey.css"; // Importing the correct CSS file

const CreateSurvey = () => {
  const [surveyDetails, setSurveyDetails] = useState({
    surveyTitle: "",
    description: "",
    link: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSurveyDetails({ ...surveyDetails, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/surveys/create-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(surveyDetails)
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Success message
        setSurveyDetails({ surveyTitle: "", description: "", link: "" }); // Clear fields
      } else {
        alert(data.message); // Error message from backend
      }
    } catch (error) {
      console.error("Error creating survey:", error);
      alert("Failed to create survey. Please try again.");
    }
  };

  return (
    <div className="create-survey-container">
      <VNavbar />
      <div className="create-survey-content">
        <h1>Create a Survey</h1>
        <label>Survey Title</label>
        <input
          type="text"
          name="surveyTitle"
          value={surveyDetails.surveyTitle}
          onChange={handleInputChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={surveyDetails.description}
          onChange={handleInputChange}
        />

        <label>Survey Link</label>
        <input
          type="text"
          name="link"
          value={surveyDetails.link}
          onChange={handleInputChange}
        />

        <div className="create-survey-actions">
          <button onClick={handleSubmit}>Create Survey</button>
        </div>
      </div>
    </div>
  );
};

export default CreateSurvey;