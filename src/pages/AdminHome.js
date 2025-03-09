import React, { useState } from "react";
import VNavbar from "../components/VerticalNavbar";
import "../styles/adminhome.css";

const registrantsData = [
  { name: "Joedem Vigmar Pacquiao", email: "jvpacman@gmail.com", date: "11-03-2024", graduated: "03-03-2019" },
  { name: "Vilnaldin Tolang", email: "vilnalditols@gmail.com", date: "11-03-2024", graduated: "03-03-2019" },
  { name: "Martin Makabudbud", email: "martinpilitmakabudbud@gmail.com", date: "11-05-2024", graduated: "12-03-2019" },
  { name: "Kevin Wick", email: "bootlegjohnwick@gmail.com", date: "11-16-2024", graduated: "5-25-2017" },
  { name: "Asi Valdez", email: "asivaldezpm@gmail.com", date: "12-01-2024", graduated: "5-18-2020" },
  { name: "Jeynada Makabaiot", email: "jnadamakavely@gmail.com", date: "12-15-2024", graduated: "4-20-2018" },
  { name: "Uncle Drew", email: "andrewgarfield@gmail.com", date: "12-18-2024", graduated: "4-20-2018" },
  { name: "Bongskie Makabago", email: "bongskiemakabago@gmail.com", date: "12-20-2024", graduated: "3-20-2013" },
  { name: "Bongskie Makabago", email: "bongskiemakabago@gmail.com", date: "12-20-2024", graduated: "3-20-2013" },
  { name: "Bongskie Makabago", email: "bongskiemakabago@gmail.com", date: "12-20-2024", graduated: "3-20-2013" },
  { name: "Bongskie Makabago", email: "bongskiemakabago@gmail.com", date: "12-20-2024", graduated: "3-20-2013" },
];

const AdminHomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const filteredRegistrants = registrantsData.filter((registrant) =>
    registrant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-homepage-container">
      <VNavbar />

      <div className="registrant-search">
        <input
          type="text"
          placeholder="Search registrants..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="registrant-table">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Name and Emails</th>
              <th>Date</th>
              <th>Year Graduated</th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrants.map((registrant, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>
                  <strong>{registrant.name}</strong>
                  <br />
                  {registrant.email}
                </td>
                <td>{registrant.date}</td>
                <td>{registrant.graduated}</td>
                <td>
                  <div className="dropdown">
                    <button
                      className="adminhome-dropdown-btn"
                      onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                    >
                      •••
                    </button>
                    {dropdownOpen === index ? (
                      <div className="admin-dropdown-menu show">
                        <p>View Details</p>
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
  );
};

export default AdminHomePage;
