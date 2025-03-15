import React, { useState } from "react";
import VNavbar from "../components/VerticalNavbar";
import "../styles/adminevents.css"; // Assuming you have a similar CSS file for styling

const AdminEvents = () => {
  const [showForm, setShowForm] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    date: "",
    time: "",
    venue: "",
    description: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleAddEventClick = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);
  const handleAddEvent = () => {
    console.log("Event Added:", eventDetails);
    setShowForm(false); // Hide the form after submission
  };

  return (
    <div className="adminevents-container">
      <VNavbar />
      <div className="adminevents-content">
        <h1>Events</h1>
        {!showForm ? (
          <div className="adminevents-add-event-section">
            <button
              className="adminevents-add-event-button"
              onClick={handleAddEventClick}
            >
              + Add an event
            </button>
          </div>
        ) : (
          <div className="adminevents-form">
            <label>Event Name</label>
            <input
              type="text"
              name="eventName"
              value={eventDetails.eventName}
              onChange={handleInputChange}
            />

            <label>Date</label>
            <input
              type="date"
              name="date"
              value={eventDetails.date}
              onChange={handleInputChange}
            />

            <label>Time</label>
            <input
              type="time"
              name="time"
              value={eventDetails.time}
              onChange={handleInputChange}
            />

            <label>Venue</label>
            <input
              type="text"
              name="venue"
              value={eventDetails.venue}
              onChange={handleInputChange}
            />

            <label>Description</label>
            <textarea
              name="description"
              value={eventDetails.description}
              onChange={handleInputChange}
            />

            <div className="adminevents-form-actions" style={{ display: "flex", gap: "10px" }}>
              <button className="adminevents-form-actions-add"onClick={handleAddEvent}>Add Event</button>
              <button className="adminevents-form-actions-cancel"onClick={handleCancel}>Cancel Event</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;