import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import VNavbar from "../components/VerticalNavbar";
import AdminSurveyModal from "../components/AdminSurveyModal";
import "../styles/components/AdminSurvey.css";

const AdminSurvey = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [surveys, setSurveys] = useState([]); // Store all surveys
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [filterTag, setFilterTag] = useState("all"); // Selected tag for filtering
  const [editingSurvey, setEditingSurvey] = useState(null); // Survey being edited
  const [newSurvey, setNewSurvey] = useState({
    SurveyTitle: "",
    Description: "",
    Link: "",
    Tags: "CCS",
  });

  // Fetch surveys from Firestore
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "survey"));
        const surveysList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSurveys(surveysList); // Store all surveys
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, []);

  // Handle creating a new survey
  const handleCreateSurvey = async () => {
    if (!newSurvey.SurveyTitle || !newSurvey.Description || !newSurvey.Link) {
      alert("Please fill out all fields before creating a survey.");
      return;
    }

    try {
      // Save the new survey to Firestore
      await addDoc(collection(db, "survey"), {
        ...newSurvey,
        surveyID: `${newSurvey.Tags}${surveys.length + 1}`.toUpperCase(), // Generate a unique surveyID
      });

      alert("Survey created successfully!");

      // Reset the form
      setNewSurvey({
        SurveyTitle: "",
        Description: "",
        Link: "",
        Tags: "CCS",
      });

      // Refresh surveys
      const querySnapshot = await getDocs(collection(db, "survey"));
      const surveysList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSurveys(surveysList);
    } catch (error) {
      console.error("Error creating survey:", error);
    }
  };

  // Filter surveys based on search query and selected tag
  const filteredSurveys = surveys.filter((survey) => {
    const matchesSearch = survey.SurveyTitle
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTag = filterTag === "all" || survey.Tags === filterTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="admin-survey-container">
      <VNavbar />
      <div className="admin-survey-content">
        <div className="tabs">
          <button
            className={activeTab === "create" ? "active" : ""}
            onClick={() => setActiveTab("create")}
          >
            Create Survey
          </button>
          <button
            className={activeTab === "view" ? "active" : ""}
            onClick={() => setActiveTab("view")}
          >
            View Surveys
          </button>
        </div>

        {/* Create Survey Section */}
        {activeTab === "create" && (
          <div className="create-survey-tab">
            <h2 classname="adminsurvey-title">Create a Survey</h2>
            <label>Survey Title</label>
            <input
              type="text"
              name="SurveyTitle"
              placeholder="Enter survey title"
              value={newSurvey.SurveyTitle}
              onChange={(e) =>
                setNewSurvey({ ...newSurvey, SurveyTitle: e.target.value })
              }
            />

            <label>Description</label>
            <textarea
              name="Description"
              placeholder="Enter survey description"
              value={newSurvey.Description}
              onChange={(e) =>
                setNewSurvey({ ...newSurvey, Description: e.target.value })
              }
            ></textarea>

            <label>Survey Link</label>
            <input
              type="text"
              name="Link"
              placeholder="Enter survey link"
              value={newSurvey.Link}
              onChange={(e) =>
                setNewSurvey({ ...newSurvey, Link: e.target.value })
              }
            />

            <label>Tags</label>
            <select
              name="Tags"
              className="tags-dropdown"
              value={newSurvey.Tags}
              onChange={(e) =>
                setNewSurvey({ ...newSurvey, Tags: e.target.value })
              }
            >
              <option value="CCS">CCS</option>
              <option value="CABE">CABE</option>
              <option value="CAH">CAH</option>
              <option value="CEA">CEA</option>
              <option value="CHEFS">CHEFS</option>
              <option value="CMBS">CMBS</option>
              <option value="CM">CM</option>
              <option value="CN">CN</option>
              <option value="CPC">CPC</option>
              <option value="CTE">CTE</option>
            </select>

            <div className="create-survey-actions">
              <button
                className="create-survey-button"
                onClick={handleCreateSurvey}
              >
                Create Survey
              </button>
            </div>
          </div>
        )}

        {/* View Surveys Section */}
        {activeTab === "view" && (
          <div className="view-surveys-tab">
            <h1>View Surveys</h1>
            <div className="view-surveys-container">
              {/* Filter and Search Section */}
              <div className="search-filter-section">
                <input
                  type="text"
                  placeholder="Search surveys..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-bar"
                />
                <div className="filter-buttons">
                  {["all", "CCS", "CABE", "CAH", "CEA", "CHEFS", "CMBS", "CM", "CN", "CPC", "CTE"].map(
                    (tag) => (
                      <button
                        key={tag}
                        className={`filter-button ${filterTag === tag ? "active" : ""}`}
                        onClick={() => setFilterTag(tag)}
                      >
                        {tag.toUpperCase()}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Survey List Section */}
              <div className="survey-list">
                {filteredSurveys.map((survey) => (
                  <div key={survey.id} className="survey-item">
                    <h2>{survey.SurveyTitle || "Untitled Survey"}</h2>
                    <p>{survey.Description || "No description available."}</p>
                    <p>
                      <strong>Tags:</strong> {survey.Tags || "N/A"}
                    </p>
                    <button
                      className="edit-button"
                      onClick={() => setEditingSurvey(survey)}
                    >
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AdminSurveyModal for editing */}
      {editingSurvey && (
        <AdminSurveyModal
          survey={editingSurvey}
          onClose={() => setEditingSurvey(null)}
          onSave={(updatedSurvey) => {
            // Update survey logic here
          }}
        />
      )}
    </div>
  );
};

export default AdminSurvey;