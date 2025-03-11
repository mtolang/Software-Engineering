import React, { useState } from "react";
import VNavbar from "../components/VerticalNavbar";
import "../styles/adminevents.css"; // Assuming you have a similar CSS file for styling

const AdminEvents = () => {
  const [eventName, setEventName] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("");

  const handleSearch = () => {
    // Implement search functionality here
    console.log("Searching for events with:", { eventName, category, tags, status });
  };

  const handleAddEvent = () => {
    // Implement add event functionality here
    console.log("Adding a new event");
  };

  return (
    <div className="adminevents-container">
      <VNavbar />
      <div className="adminevents-content">
        <h1>Events</h1>
        <div className="adminevents-search-section">
          <h2>Advanced search</h2>
          <div className="adminevents-search-fields">
            <div className="adminevents-search-field">
              <label>Event name</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>
            <div className="adminevents-search-field">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">No selected category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select>
            </div>
            <div className="adminevents-search-field">
              <label>Tag(s)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Choose tags to filter"
              />
            </div>
            <div className="adminevents-search-field">
              <label>Status</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Add elements"
              />
            </div>
          </div>
          <div className="adminevents-search-actions">
            <button onClick={handleSearch}>Search</button>
            <button onClick={() => { setEventName(""); setCategory(""); setTags(""); setStatus(""); }}>Reset search</button>
          </div>
        </div>
        <div className="adminevents-add-event-section">
          <button className="adminevents-add-event-button" onClick={handleAddEvent}>+ Add an event</button>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;