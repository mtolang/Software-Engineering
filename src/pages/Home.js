import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // ✅ Import the Navbar component
import "../styles/home.css"; // ✅ Import the separate CSS file
import event1 from "../assets/event1.jpg"; // Import the event1 image
import event2 from "../assets/event2.jpg"; // Import the event2 image
import news3 from "../assets/news3.jpg"; // Import the news3 image
import news4 from "../assets/news4.jpg"; // Import the news4 image

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("latest-events");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const eventsList = [
    { id: 1, title: "Intramurals 2025", date: "Feb 26 - Mar 1, 2025" },
    { id: 2, title: "Ash Wednesday Celebration", date: "Feb 14, 2025" },
    { id: 3, title: "Alumni Homecoming", date: "Jan 20, 2025" },
    { id: 4, title: "Career Fair 2025", date: "Mar 15, 2025" },
  ];

  const collegesList = [
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
  ];

  const collegeLinks = [
    "https://cabe.uic.edu.ph/",
    "https://cah.uic.edu.ph/",
    "https://ccs.uic.edu.ph/",
    "https://cea.uic.edu.ph/",
    "https://chefs.uic.edu.ph/",
    "https://cmbs.uic.edu.ph/",
    "https://www.uic.edu.ph/#",
    "https://cn.uic.edu.ph/",
    "https://cpc.uic.edu.ph/",
    "https://cte.uic.edu.ph/"

  ];

  return (
    <div className="homebox">
      <Navbar /> {/* ✅ Navbar at the top */}

      <section className="home" id="home">
        <div className="newsevents-container">
          {/* Left Side: Preview Section */}
          <div className="newsevents-preview">
            {selectedEvent === "Intramurals 2025" && (
              <div className="newsevents-latest-events">
                <h2>Intramurals 2025</h2>
                <p>
                  𝐈𝐍 𝐏𝐇𝐎𝐓𝐎𝐒 | Relive the excitement of the University of the Immaculate Conception’s (UIC) 2024-2025 College Intramurals! 🎉🏆
                  With a spectacular opening, the much-awaited event took place from February 26 to March 1 at various venues, including the Fr Selga Main Campus. The enthusiasm of each participant ignited the place with energy, passion, and school spirit.
                  Four dynamic clusters, formed by the university’s esteemed colleges, came together in the spirit of camaraderie and competition, battling fiercely in various sports and recreational events. <br></br>From heart-stopping basketball games 🏀 to thrilling esports tournaments 🎮, breathtaking dance performances 💃 and a show-stopping pageant 👑, the UIC Intramurals was nothing short of extraordinary!
                  Beyond the competition, the event fostered unity, discipline, sportsmanship and pride among students, proving that UIC is not just about excellence in academics but also in sports and teamwork. 💪🔥  
                  Photos by: Rigel Sarsaba, Christian Yuson, Shean Ng-Ee, UCO Interns 
                  Edited by: Ronnie Mallo, UCO Intern
                  Captioned by: Rigel Sarsaba, UCO Intern
                  <strong>#Intramurals2025 #Kinaadman #UICDavao #ChooseUIC #FaithExcellenceService</strong>
                </p>
                <div className="newsevents-event-images">
                  <img src={event1} alt="Event 1" />
                  <img src={event2} alt="Event 2" />
                </div>
              </div>
            )}
            {/* Other event previews */}
          </div>

          {/* Right Side: Search and List Section */}
          <div className="newsevents-sidebar">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="newsevents-search-bar"
            />
            <h3>Upcoming Events</h3>
            <ul className="newsevents-list">
              {eventsList
                .filter((event) =>
                  event.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((event) => (
                  <li
                    key={event.id}
                    className={selectedEvent === event.title ? "active" : ""}
                    onClick={() => setSelectedEvent(event.title)}
                  >
                    <h4>{event.title}</h4>
                    <p>{event.date}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Colleges Section */}
      <section className="colleges" id="colleges">
        <div className="main-text">
          <h2><span>UIC COLLEGES</span></h2>
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
      </footer>
    </div>
  );
};

export default HomePage;