import React from "react";
import Navbar from "../components/Navbar"; // ✅ Import the Navbar component
import "../styles/home.css"; // ✅ Import the separate CSS file

const HomePage = () => {
  return (
    <div className="homebox">
      <Navbar /> {/* ✅ Navbar at the top */}
      
      <section className="home" id="home">
        <div className="home-text">
          <div className="slide">
            <span className="one">Hello</span>
          </div>
          <h1>ALUMNI</h1>
          <h3>WELCOME TO <span>UIC ALUMNI PORTAL.</span></h3>
          <p></p>
          <a href="#about" className="visit-btn">EXPLORE NOW</a>
        </div>
      </section>

      {/* About Section */}
      <section className="about" id="about">
        <div className="about-img">
          <img src="pics/cropted profile.jpg" alt="Profile" />
        </div>
        <div className="about-text">
          <h2>About </h2>
          <h4><span>ALUMNI PORTAL</span></h4>
          <p>Welcome to the Alumni Portal! This platform is designed to help you reconnect with fellow alumni, stay updated on events, explore job opportunities, and give back to the community. Whether you're looking to reminisce about your college days or expand your professional network, this portal is your gateway to staying connected.</p>
          <a href="#about" className="visit-btn">Learn More</a>
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
            <h3>News & Events</h3>
            <p>Stay informed about the latest happenings in our alumni community. From reunions and networking events to academic seminars and celebrations, never miss out on important updates!</p>
            <a href="#services" className="read-more">Read More</a>
          </div>
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
