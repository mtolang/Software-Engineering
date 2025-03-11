import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // ✅ Correct
import { collection, getDocs, addDoc } from "firebase/firestore"; // Add addDoc
import VNavbar from "../components/VerticalNavbar";
import AdminHomeModal from "../components/AdminHomeModal"; 
import "../styles/adminhome.css";

const AdminHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRegistrant, setSelectedRegistrant] = useState(null);
  const [registrants, setRegistrants] = useState([]); // 🔥 Store fetched data

  // 🔥 Fetch registrants from Firestore
  useEffect(() => {
    const fetchRegistrants = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "registrants"));
        const registrantsList = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            email: data.email,
            password: data.password,
            course_graduated: data.course_graduated || "N/A",
            current_address: data.current_address || "N/A",
            date_registered: data.date_registered?.seconds
              ? new Date(data.date_registered.seconds * 1000).toLocaleString()
              : "N/A",
            year_graduated: data.year_graduated || "N/A",
          };
        });
        setRegistrants(registrantsList);
      } catch (error) {
        console.error("Error fetching registrants:", error);
      }
    };
  
    fetchRegistrants();
  }, []);

  // 🔍 Filter registrants based on search input
  const filteredRegistrants = registrants.filter((registrant) =>
    registrant.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const saveToAlumni = async (registrant) => {
    try {
      await addDoc(collection(db, "alumni"), registrant);
      console.log("Registrant saved to alumni:", registrant);
    } catch (error) {
      console.error("Error saving to alumni:", error);
    }
  };

  return (
    <div className="admin-homepage-container">
      <VNavbar />

      <div className="registrant-search">
        <input
          type="text"
          placeholder="Search registrants..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="table-container"> {/* Fixed class name from registrant-table to table-container */}
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
            {filteredRegistrants.map((registrant, index) => (
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
                  <div className="more-details"> {/* Fixed class name from dropdown to more-details */}
                    <button
                      className="adminhome-dropdown-btn"
                      onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                    >
                      •••
                    </button>
                    {dropdownOpen === index ? (
                      <div className="admin-dropdown-menu show">
                        <p onClick={() => { setSelectedRegistrant(registrant); setModalOpen(true); }}>View Details</p>
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

      {/* 🏆 Modal to Show Registrant Details */}
      <AdminHomeModal isOpen={modalOpen} onClose={() => setModalOpen(false)} registrant={selectedRegistrant} onSave={saveToAlumni} />
    </div>
  );
};

export default AdminHome;
