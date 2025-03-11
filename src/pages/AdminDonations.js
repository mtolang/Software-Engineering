import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import VNavbar from "../components/VerticalNavbar";
import "../styles/admindonations.css"; // Assuming you have a similar CSS file for styling

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "donations"));
        const donationsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDonations(donationsList);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="admindonations-container">
      <VNavbar />
      <div className="admin-donations-content">
        <h1>Donations</h1>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Bank Type</th>
                <th>Course Graduated</th>
                <th>Date Graduated</th>
                <th>Date Sent</th>
                <th>Message</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Transaction ID</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(donation => (
                <tr key={donation.id}>
                  <td>{donation.full_name}</td>
                  <td>{donation.email}</td>
                  <td>{donation.amount}</td>
                  <td>{donation.bank_type}</td>
                  <td>{donation.course_graduated}</td>
                  <td>{donation.date_graduated}</td>
                  <td>{new Date(donation.date_sent.seconds * 1000).toLocaleString()}</td>
                  <td>{donation.message}</td>
                  <td>{donation.payment_method}</td>
                  <td>{donation.status}</td>
                  <td>{donation.transaction_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDonations;