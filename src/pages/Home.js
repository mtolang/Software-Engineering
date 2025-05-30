import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
import "../styles/home.css";

const HomePage = () => {
  const [events, setEvents] = useState([]); // State to store events
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState({}); // Track expanded items
  const [selectedFilter, setSelectedFilter] = useState("all"); // State for dropdown filter
  const [collegesList] = useState([
    "College of Accounting and Business Education",
    "College of Arts and Humanities",
    "College of Computer Studies",
    "College of Engineering and Architecture",
    "College of Human Environmental Science and Food Studies",
    "College of Medical and Biological Sciences",
    "College of Music",
    "College of Nursing",
    "College of Pharmacy and Chemistry",
    "College of Teacher Education",
  ]);
  const [collegeLinks] = useState([
    "https://cabe.uic.edu.ph/",
    "https://cah.uic.edu.ph/",
    "https://ccs.uic.edu.ph/",
    "https://cea.uic.edu.ph/",
    "https://chefs.uic.edu.ph/",
    "https://cmbs.uic.edu.ph/",
    "https://www.uic.edu.ph/#",
    "https://cn.uic.edu.ph/",
    "https://cpc.uic.edu.ph/",
    "https://cte.uic.edu.ph/",
  ]);

  // Fetch user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Fetch events from Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched Events:", eventsList); // Debugging
        setEvents(eventsList); // Set the fetched events in state
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Toggle "See more..." for long descriptions
  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the expanded state for the specific item
    }));
  };

  // Filter events based on search query and selected filter
  const filteredEvents = events.filter((event) => {
    const matchesSearchQuery = event.eventName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || event.tags?.toLowerCase().includes(selectedFilter);

    return matchesSearchQuery && matchesFilter;
  });

  return (
    <div className="homebox">
      <Navbar />
      <section className="home" id="home">
        <div className="newsevents-container">
          {/* Left Side: Event Previews */}
          <div className="newsevents-preview">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div key={event.id} className="newsevents-latest-events">
                  <h2>{event.eventName || "Untitled Event"}</h2>
                  <p>
                    {expandedItems[event.id] || event.description.length <= 150
                      ? event.description
                      : `${event.description.slice(0, 150)}...`}
                  </p>
                  {event.description.length > 150 && (
                    <span
                      className="see-more-btn"
                      onClick={() => toggleExpand(event.id)}
                    >
                      {expandedItems[event.id] ? "See less" : "See more..."}
                    </span>
                  )}
                  <p>
                    <strong>Date:</strong> {event.date || "N/A"} <br />
                    <strong>Time:</strong> {event.time || "N/A"} <br />
                    <strong>Venue:</strong> {event.venue || "N/A"} <br />
                    <strong>Tags:</strong> {event.tags || "N/A"}
                  </p>
                </div>
              ))
            ) : (
              <p>No events found.</p>
            )}
          </div>

          {/* Right Side: Search Bar and Filter Dropdown */}
          <div className="newsevents-sidebar">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="newsevents-search-bar"
            />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="newsevents-filter-dropdown"
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
          </div>
        </div>
      </section>

      <section className="colleges" id="colleges">
        <div className="main-text">
          <h2>
            <span>UIC COLLEGES</span>
          </h2>
          <h2>Explore Our Colleges</h2>
        </div>
        <div className="colleges-content">
          {collegesList.map((college, index) => (
            <div className="box" key={index}>
              <h3>{college}</h3>
              <a
                href={collegeLinks[index] || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="visit-button"
              >
                Visit
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
    <p>© 2025 Alumni Portal. All rights reserved.</p>
   <button
    className="donation-button"
    onClick={() => window.location.href = "/AlumniDonations"}
   >
       Donate Now
    </button>
</footer>
    </div>
  );
};

export default HomePage;