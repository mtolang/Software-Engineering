import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import VNavbar from "../components/VerticalNavbar";
import AdminAlumniModal from "../components/AdminAlumniModal"; 
import "../styles/adminalumni.css";

const AdminAlumniPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "alumni"));
        const alumniList = querySnapshot.docs.map(doc => {
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
        setAlumni(alumniList);
      } catch (error) {
        console.error("Error fetching alumni:", error);
      }
    };
  
    fetchAlumni();
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

      <div className="table-container">
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
            ).map((alumnus, index) => (
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
                  <div className="more-details">
                    <button
                      className="adminalumni-dropdown-btn"
                      onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                    >
                      •••
                    </button>
                    {dropdownOpen === index ? (
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

      <AdminAlumniModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        alumni={selectedAlumni}
      />
    </div>
  );
};

export default AdminAlumniPage;
