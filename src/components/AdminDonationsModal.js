import React, { useState } from "react";
import "../styles/components/admindonationsmodal.css"; // Add a CSS file for modal styling

const AdminDonationsModal = ({ donation, onClose, onUpdateStatus }) => {
  const [status, setStatus] = useState(donation.status);

  const handleStatusChange = () => {
    if (status === "pending" || status === "accepted") {
      onUpdateStatus(donation.id, status);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Donation Details</h2>
        <p><strong>Full Name:</strong> {donation.full_name}</p>
        <p><strong>Email:</strong> {donation.email}</p>
        <p><strong>Amount:</strong> {donation.amount}</p>
        <p><strong>Bank Type:</strong> {donation.bank_type}</p>
        <p><strong>Course Graduated:</strong> {donation.course_graduated}</p>
        <p><strong>Date Graduated:</strong> {donation.date_graduated}</p>
        <p><strong>Date Sent:</strong> {new Date(donation.date_sent.seconds * 1000).toLocaleString()}</p>
        <p><strong>Purpose:</strong> {donation.message}</p>
        <p><strong>Payment Method:</strong> {donation.payment_method}</p>
        <p><strong>Transaction ID:</strong> {donation.transaction_id}</p>
        <p>
          <strong>Status:</strong>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={!(donation.status === "pending" || donation.status === "accepted")}
          >
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </p>
        <div className="modal-actions">
          <button onClick={handleStatusChange} disabled={!(status === "pending" || status === "accepted")}>
            Update Status
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDonationsModal;