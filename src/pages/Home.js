import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // ✅ Import the Navbar component
import "../styles/home.css"; // ✅ Import the separate CSS file
import event1 from "../assets/event1.jpg"; // Import the event1 image
import event2 from "../assets/event2.jpg"; // Import the event2 image
import news3 from "../assets/news3.jpg"; // Import the news3 image
import news4 from "../assets/news4.jpg"; // Import the news4 image

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="homebox">
      <Navbar /> {/* ✅ Navbar at the top */}
      
      <section className="home" id="home">
      <div className="newsevents-homebox">
            <div className="newsevents-container">
                <div className="newsevents-latest-events">
                    <h2>LATEST EVENTS</h2>
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

                <div className="newsevents-latest-news">
                    <h2>LATEST NEWS</h2>
                    <p>
                        <strong>𝐈𝐍 𝐏𝐇𝐎𝐓𝐎𝐒 </strong>| UIC observes Ash Wednesday with a solemn Eucharistic celebration.
                        At the heart of this sacred gathering was the Gospel of Matthew (6:1-6, 16-18), which reminds the faithful to fast, pray, and give alms with sincerity, seeking God’s grace rather than human praise.🙏✨
                        The celebration also marked the beginning of Lent, a season of repentance, renewal, and spiritual preparation for the resurrection of Christ.🙏📿<br></br>
                        <strong>#UICDavao <br></br></strong>
                        <strong>#ChooseUIC<br></br></strong>
                        <strong>#FaithExcellenceService</strong>
                    </p>
                    <div className="newsevents-event-images">
                        <img src={news3} alt="News 3" />
                        <img src={news4} alt="News 4" />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="main-text">
          <h2><span>ALUMNI PORTAL</span> </h2>
          <h2>Services</h2>
        </div>
        <div className="services-content">
          <div className="box">
            <div className="s-icons"></div>
            <h3>Looking For A Job?</h3>
            <p>Are you searching for career opportunities or looking to hire talented alumni? Our job board connects graduates with employers and fellow alumni offering job openings, internships, and mentorship programs.</p>
            <a href="/job" className="read-more">Read More</a>
          </div>
          <div className="box">
            <div className="s-icons"></div>
            <h3>Donations</h3>
            <p>Support the next generation of students and fellow alumni by making a donation. Your contributions help fund scholarships, campus improvements, and community projects that make a difference.</p>
            <a href="#services" className="read-more">Read More</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Alumni Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;