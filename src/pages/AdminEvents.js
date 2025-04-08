import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // Import Firestore configuration
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import VNavbar from "../components/VerticalNavbar";
import AdminEventsModal from "../components/AdminEventsModal"; // Import the modal component
import "../styles/adminevents.css"; // Assuming you have a similar CSS file for styling

const AdminEvents = () => {
  const [showForm, setShowForm] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    tags: "all", // Default to "all"
  });
  const [events, setEvents] = useState([]); // State to store events
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [filterTag, setFilterTag] = useState("all"); // State for filtering by tags
  const [editingEventId, setEditingEventId] = useState(null); // State for editing an event

  // Fetch existing events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList); // Set the fetched events in state
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEventClick = () => {
    setShowForm(true);
    setEditingEventId(null); // Reset editing state
    setEventDetails({
      eventName: "",
      date: "",
      time: "",
      venue: "",
      description: "",
      tags: "all",
    });
  };

  const handleCancel = () => setShowForm(false);

  const handleAddOrUpdateEvent = async () => {
    try {
      if (editingEventId) {
        // Update existing event
        const eventDoc = doc(db, "events", editingEventId);
        await updateDoc(eventDoc, eventDetails);
        alert("Event updated successfully!");
      } else {
        // Add new event
        const querySnapshot = await getDocs(collection(db, "events"));
        const baseId = 202500;
        const eventId = baseId + querySnapshot.size + 1;

        await addDoc(collection(db, "events"), {
          EventId: eventId, // Unique EventId
          ...eventDetails,
        });
        alert("Event added successfully!");
      }

      setShowForm(false); // Hide the form after submission
      setEventDetails({
        eventName: "",
        date: "",
        time: "",
        venue: "",
        description: "",
        tags: "all",
      });

      // Refresh the events list
      const updatedQuerySnapshot = await getDocs(collection(db, "events"));
      const updatedEventsList = updatedQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(updatedEventsList);
    } catch (error) {
      console.error("Error adding/updating event:", error);
      alert("Failed to add/update event. Please try again.");
    }
  };

  const handleEditEvent = (event) => {
    setEditingEventId(event.id);
    setEventDetails({
      eventName: event.eventName,
      date: event.date,
      time: event.time,
      venue: event.venue,
      description: event.description,
      tags: event.tags,
    });
    setShowForm(true);
  };

  const handleFilterByTag = (tag) => {
    setFilterTag(tag);
  };

  // Filter events based on search query and selected tag
  const filteredEvents = events.filter(
    (event) =>
      event.eventName?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterTag === "all" || event.tags === filterTag)
  );

  return (
    <div className="adminevents-container">
      <VNavbar />
      <div className="adminevents-content">
        <h1>Events</h1>
        <button
          className="adminevents-add-event-button"
          onClick={handleAddEventClick}
        >
          + Add an Event
        </button>

        {/* Events Preview Section */}
        <section className="home" id="home">
          <div className="newsevents-container">
            {/* Search Bar */}
            <div className="newsevents-sidebar">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="newsevents-search-bar"
              />
              <div className="filter-buttons">
                {["all", "cabe", "cah", "ccs", "cea", "chefs", "cmbs", "cm", "cn", "cpc", "cte"].map(
                  (tag) => (
                    <button
                      key={tag}
                      className={`filter-button ${filterTag === tag ? "active" : ""}`}
                      onClick={() => handleFilterByTag(tag)}
                    >
                      {tag.toUpperCase()}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Event Previews */}
            <div className="newsevents-preview">
              {filteredEvents.map((event) => {
                const eventDate = event.date
                  ? new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A";

                const eventTime = event.time
                  ? new Date(`1970-01-01T${event.time}`).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "N/A";

                return (
                  <div key={event.id} className="newsevents-latest-events">
                    <h2>{event.eventName || "Untitled Event"}</h2>
                    <p>{event.description || "No description available."}</p>
                    <p>
                      <strong>Date:</strong> {eventDate} <br />
                      <strong>Time:</strong> {eventTime} <br />
                      <strong>Venue:</strong> {event.venue || "N/A"} <br />
                      <strong>Tags:</strong> {event.tags || "N/A"}
                    </p>
                    <button
                      className="edit-event-button"
                      onClick={() => handleEditEvent(event)}
                    >
                      Edit
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Modal for Adding/Editing Events */}
      {showForm && (
        <AdminEventsModal
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
          handleAddOrUpdateEvent={handleAddOrUpdateEvent}
          handleCancel={handleCancel}
          editingEventId={editingEventId}
        />
      )}
    </div>
  );
};

export default AdminEvents;