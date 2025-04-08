import React from "react";
import "../styles/components/admineventsmodal.css"; // Add styles for the modal

const AdminEventsModal = ({
  eventDetails,
  setEventDetails,
  handleAddOrUpdateEvent,
  handleCancel,
  editingEventId,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{editingEventId ? "Edit Event" : "Add Event"}</h2>
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

        <label>Tags</label>
        <select
          name="tags"
          value={eventDetails.tags}
          onChange={handleInputChange}
        >
          <option value="all">All</option>
          <option value="cabe">CABE</option>
          <option value="cah">CAH</option>
          <option value="ccs">CCS</option>
          <option value="cea">CEA</option>
          <option value="chefs">CHEFS</option>
          <option value="cmbs">CMBS</option>
          <option value="cm">CM</option>
          <option value="cn">CN</option>
          <option value="cpc">CPC</option>
          <option value="cte">CTE</option>
        </select>

        <div className="modal-actions">
          <button onClick={handleAddOrUpdateEvent}>
            {editingEventId ? "Update Event" : "Add Event"}
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AdminEventsModal;