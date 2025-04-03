import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import VNavbar from "../components/VerticalNavbar";
import AdminAlumniModal from "../components/AdminAlumniModal";
import AdminHomeModal from "../components/AdminHomeModal"; // Import AdminHomeModal
import "../styles/adminalumni.css";

const AdminAlumniPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [registrantsDropdownOpen, setRegistrantsDropdownOpen] = useState(null); // Separate state for registrants dropdown
  const [alumniDropdownOpen, setAlumniDropdownOpen] = useState(null); // Separate state for alumni dropdown
  const [modalOpen, setModalOpen] = useState(false);
  const [homeModalOpen, setHomeModalOpen] = useState(false); // For AdminHomeModal
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [selectedRegistrant, setSelectedRegistrant] = useState(null); // For registrants
  const [registrants, setRegistrants] = useState([]);
  const [alumni, setAlumni] = useState([]);

  const registrantsDropdownRef = useRef([]); // Initialize as an empty array
  const alumniDropdownRef = useRef([]); // Initialize as an empty array

  // Function to fetch data for registrants and alumni
  const fetchData = async () => {
    try {
      // Fetch alumni data
      const alumniSnapshot = await getDocs(collection(db, "alumni"));
      const alumniList = alumniSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          email: data.email,
          course_graduated: data.course_graduated || "N/A",
          year_graduated: data.year_graduated || "N/A",
          date_registered: data.date_registered?.seconds
            ? new Date(data.date_registered.seconds * 1000).toLocaleString()
            : "N/A",
        };
      });
      setAlumni(alumniList);

      // Fetch registrants data
      const registrantsSnapshot = await getDocs(collection(db, "registrants"));
      const registrantsList = registrantsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          email: data.email,
          course_graduated: data.course_graduated || "N/A",
          year_graduated: data.year_graduated || "N/A",
          date_registered: data.date_registered?.seconds
            ? new Date(data.date_registered.seconds * 1000).toLocaleString()
            : "N/A",
        };
      });
      setRegistrants(registrantsList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  // Function to handle accepting a registrant
  const handleAcceptRegistrant = async (registrant) => {
    try {
      // Perform the logic to accept the registrant (e.g., move them to the alumni collection)
      console.log(`Accepting registrant: ${registrant.name}`);

      // After accepting, refresh the data
      await fetchData();
    } catch (error) {
      console.error("Error accepting registrant:", error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check for registrants dropdown
      if (
        registrantsDropdownRef.current.every(
          (ref) => ref && !ref.contains(event.target)
        )
      ) {
        setRegistrantsDropdownOpen(null);
      }

      // Check for alumni dropdown
      if (
        alumniDropdownRef.current.every(
          (ref) => ref && !ref.contains(event.target)
        )
      ) {
        setAlumniDropdownOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
                <th><input type="checkbox" /></th>
                <th>Name and Email</th>
                <th>Date Registered</th>
                <th>Year Graduated</th>
                <th>More Details</th>
              </tr>
            </thead>
            <tbody>
              {registrants.filter((registrant) =>
                registrant.name?.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((registrant, index) => ( // Show all rows
                <tr key={registrant.id}>
                  <td><input type="checkbox" /></td>
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
                        onClick={() => setRegistrantsDropdownOpen(registrantsDropdownOpen === index ? null : index)}
                      >
                        •••
                      </button>
                      {registrantsDropdownOpen === index ? (
                        <div className="adminalumni-dropdown-menu show">
                          <p onClick={() => { setSelectedRegistrant(registrant); setHomeModalOpen(true); }}>View Details</p>
                          <p onClick={() => handleAcceptRegistrant(registrant)}>Accept</p>
                        </div>
                      ) : null}
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
                <th><input type="checkbox" /></th>
                <th>Name and Email</th>
                <th>Course Graduated</th>
                <th>Year Graduated</th>
                <th>More Details</th>
              </tr>
            </thead>
            <tbody>
              {alumni.filter((alumnus) =>
                alumnus.name?.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((alumnus, index) => ( // Show all rows
                <tr key={alumnus.id}>
                  <td><input type="checkbox" /></td>
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
                        onClick={() => setAlumniDropdownOpen(alumniDropdownOpen === index ? null : index)}
                      >
                        •••
                      </button>
                      {alumniDropdownOpen === index ? (
                        <div className="adminalumni-dropdown-menu show">
                          <p onClick={() => { setSelectedAlumni(alumnus); setModalOpen(true); }}>View Details</p>
                          <p>Send Message</p>
                        </div>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AdminAlumniModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          fetchData(); // Refresh data when the modal closes
        }}
        alumni={selectedAlumni}
      />
      <AdminHomeModal
        isOpen={homeModalOpen}
        onClose={() => {
          setHomeModalOpen(false);
          fetchData(); // Refresh data when the modal closes
        }}
        registrant={selectedRegistrant}
      />
    </div>
  );
};

export default AdminAlumniPage;