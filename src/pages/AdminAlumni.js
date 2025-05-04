import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import VNavbar from "../components/VerticalNavbar";
import AdminHomeModal from "../components/AdminHomeModal";
import AdminAlumniModal from "../components/AdminAlumniModal";
import "../styles/adminalumni.css";

const AdminAlumniPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [registrantsDropdownOpen, setRegistrantsDropdownOpen] = useState(null);
  const [alumniDropdownOpen, setAlumniDropdownOpen] = useState(null);
  const [registrants, setRegistrants] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [isRegistrantModalOpen, setIsRegistrantModalOpen] = useState(false);
  const [isAlumniModalOpen, setIsAlumniModalOpen] = useState(false);
  const [selectedRegistrant, setSelectedRegistrant] = useState(null);
  const [selectedAlumnus, setSelectedAlumnus] = useState(null);

  const registrantsDropdownRef = useRef([]);
  const alumniDropdownRef = useRef([]);

  const fetchData = async () => {
    try {
      const registrantsSnapshot = await getDocs(collection(db, "registrants"));
      const registrantsList = registrantsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date_registered: data.date_registered?.seconds
            ? new Date(data.date_registered.seconds * 1000).toLocaleString()
            : "N/A",
        };
      });
      setRegistrants(registrantsList);

      const alumniSnapshot = await getDocs(collection(db, "alumni"));
      const alumniList = alumniSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date_registered: data.date_registered?.seconds
            ? new Date(data.date_registered.seconds * 1000).toLocaleString()
            : "N/A",
        };
      });
      setAlumni(alumniList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewRegistrantDetails = (registrant) => {
    setSelectedRegistrant(registrant);
    setIsRegistrantModalOpen(true);
  };

  const handleViewAlumniDetails = (alumnus) => {
    setSelectedAlumnus(alumnus);
    setIsAlumniModalOpen(true);
  };

  const handleMessage = (email) => {
    const subject = encodeURIComponent("Subject goes here");
    const body = encodeURIComponent("Body content goes here");
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailComposeUrl, "_blank");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the registrants dropdown
      if (
        registrantsDropdownOpen !== null &&
        registrantsDropdownRef.current[registrantsDropdownOpen] &&
        !registrantsDropdownRef.current[registrantsDropdownOpen].contains(event.target)
      ) {
        setRegistrantsDropdownOpen(null);
      }

      // Check if the click is outside the alumni dropdown
      if (
        alumniDropdownOpen !== null &&
        alumniDropdownRef.current[alumniDropdownOpen] &&
        !alumniDropdownRef.current[alumniDropdownOpen].contains(event.target)
      ) {
        setAlumniDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [registrantsDropdownOpen, alumniDropdownOpen]);

  return (
    <div className="adminalumni-container">
      <VNavbar />

      <div className="registrant-search">
        <input
          type="text"
          placeholder="Search alumni..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Registrants Table */}
      <div className="table-container">
        <h2>Registrants</h2>
        <div className="scrollable-table">
          <table>
            <thead>
              <tr>
                <th>Name and Email</th>
                <th>Date Registered</th>
                <th>Year Graduated</th>
                <th>More Details</th>
              </tr>
            </thead>
            <tbody>
              {registrants
                .filter((registrant) =>
                  registrant.name?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((registrant, index) => (
                  <tr key={registrant.id}>
                    <td>
                      <strong>{registrant.name}</strong>
                      <br />
                      {registrant.email}
                    </td>
                    <td>{registrant.date_registered}</td>
                    <td>{registrant.year_graduated}</td>
                    <td>
                      <div
                        className="more-details"
                        ref={(el) => {
                          registrantsDropdownRef.current[index] = el;
                        }}
                      >
                        <button
                          className="adminalumni-dropdown-btn"
                          onClick={() =>
                            setRegistrantsDropdownOpen(
                              registrantsDropdownOpen === index ? null : index
                            )
                          }
                        >
                          •••
                        </button>
                        {registrantsDropdownOpen === index && (
                          <div className="adminalumni-dropdown-menu show">
                            <p onClick={() => handleViewRegistrantDetails(registrant)}>
                              View Details
                            </p>
                            <p onClick={() => handleMessage(registrant.email)}>Message</p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alumni Table */}
      <div className="table-container">
        <h2>Alumni</h2>
        <div className="scrollable-table">
          <table>
            <thead>
              <tr>
                <th>Name and Email</th>
                <th>Course Graduated</th>
                <th>Year Graduated</th>
                <th>More Details</th>
              </tr>
            </thead>
            <tbody>
              {alumni
                .filter((alumnus) =>
                  alumnus.name?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((alumnus, index) => (
                  <tr key={alumnus.id}>
                    <td>
                      <strong>{alumnus.name}</strong>
                      <br />
                      {alumnus.email}
                    </td>
                    <td>{alumnus.course_graduated}</td>
                    <td>{alumnus.year_graduated}</td>
                    <td>
                      <div
                        className="more-details"
                        ref={(el) => {
                          alumniDropdownRef.current[index] = el;
                        }}
                      >
                        <button
                          className="adminalumni-dropdown-btn"
                          onClick={() =>
                            setAlumniDropdownOpen(
                              alumniDropdownOpen === index ? null : index
                            )
                          }
                        >
                          •••
                        </button>
                        {alumniDropdownOpen === index && (
                          <div className="adminalumni-dropdown-menu show">
                            <p onClick={() => handleViewAlumniDetails(alumnus)}>View Details</p>
                            <p onClick={() => handleMessage(alumnus.email)}>Message</p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AdminHomeModal
        isOpen={isRegistrantModalOpen}
        onClose={() => setIsRegistrantModalOpen(false)}
        registrant={selectedRegistrant}
      />

      <AdminAlumniModal
        isOpen={isAlumniModalOpen}
        onClose={() => setIsAlumniModalOpen(false)}
        alumnus={selectedAlumnus}
      />
    </div>
  );
};

export default AdminAlumniPage;