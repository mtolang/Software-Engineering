import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import VNavbar from "../components/VerticalNavbar";
import AdminDonationsModal from "../components/AdminDonationsModal"; // Import the modal component
import "../styles/admindonations.css"; // Assuming you have a similar CSS file for styling

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "donations"));
        const donationsList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            date_sent: data.date_sent?.seconds
              ? new Date(data.date_sent.seconds * 1000).toLocaleString()
              : "N/A", // Convert Firestore Timestamp to readable date
          };
        });
        setDonations(donationsList);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const donationRef = doc(db, "donations", id);
      await updateDoc(donationRef, { status: newStatus });
      setDonations((prevDonations) =>
        prevDonations.map((donation) =>
          donation.id === id ? { ...donation, status: newStatus } : donation
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="admindonations-container">
      <VNavbar />
      <div className="admin-donations-content">
        <h2 className="donations-title">Donations</h2>
        <div className="table-container">
          <div className="scrollable-table">
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Date Sent</th>
                  <th>Bank Type</th>
                  <th>Status</th>
                  <th>More Details</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation.id}>
                    <td>
                      <strong>{donation.full_name}</strong>
                    </td>
                    <td>{donation.date_sent}</td>
                    <td>{donation.bank_type}</td>
                    <td>{donation.status}</td>
                    <td>
                      <button
                        className="more-details-btn"
                        onClick={() => {
                          setSelectedDonation(donation);
                          setModalOpen(true);
                        }}
                      >
                        •••
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalOpen && (
        <AdminDonationsModal
          donation={selectedDonation}
          onClose={() => setModalOpen(false)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
};

export default AdminDonations;