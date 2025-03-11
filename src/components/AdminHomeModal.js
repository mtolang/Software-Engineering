import React from "react";
import { db } from "../firebaseConfig";
import { doc, deleteDoc, getDoc, setDoc } from "firebase/firestore"; // ✅ Firestore functions
import "../styles/components/adminhomemodal.css"; // Separate CSS for this modal

const AdminHomeModal = ({ isOpen, onClose, registrant }) => {
  if (!isOpen || !registrant) return null;

  // ✅ Accept Function (e.g., Update Status in Firestore)
  const handleAccept = async () => {
    try {
      const registrantRef = doc(db, "registrants", registrant.id);
      const alumniRef = doc(db, "alumni", registrant.id);

      // Get the registrant data
      const registrantSnapshot = await getDoc(registrantRef);
      if (registrantSnapshot.exists()) {
        const registrantData = registrantSnapshot.data();

        // Add the registrant data to the alumni collection
        await setDoc(alumniRef, registrantData);

        // Delete the registrant from the registrants collection
        await deleteDoc(registrantRef);

        alert("Registrant Accepted and moved to Alumni! ✅");
        onClose(); // Close modal after action
      } else {
        console.error("No such registrant!");
      }
    } catch (error) {
      console.error("Error accepting registrant:", error);
    }
  };

  // ❌ Decline Function (e.g., Delete from Firestore)
  const handleDecline = async () => {
    if (window.confirm("Are you sure you want to decline this registrant?")) {
      try {
        const registrantRef = doc(db, "registrants", registrant.id);
        await deleteDoc(registrantRef); // ❌ Delete registrant from Firestore
        alert("Registrant Declined. ❌");
        onClose();
      } catch (error) {
        console.error("Error declining registrant:", error);
      }
    }
  };

  return (
    <div className="adminhome-modal-overlay">
    <div className="adminhome-modal-content">
      <h2 className="adminhome-modal-title">Registrant Details</h2>

      <div className="adminhome-modal-detail">
        <strong>Name:</strong>
        <div className="adminhome-modal-box">{registrant.name}</div>
      </div>

      <div className="adminhome-modal-detail">
        <strong>Email:</strong>
        <div className="adminhome-modal-box">{registrant.email}</div>
      </div>

      <div className="adminhome-modal-detail">
        <strong>Course Graduated:</strong>
        <div className="adminhome-modal-box">{registrant.course_graduated}</div>
      </div>

      <div className="adminhome-modal-detail">
        <strong>Current Address:</strong>
        <div className="adminhome-modal-box">{registrant.current_address}</div>
      </div>

      <div className="adminhome-modal-detail">
        <strong>Year Graduated:</strong>
        <div className="adminhome-modal-box">{registrant.year_graduated}</div>
      </div>

      <div className="adminhome-modal-detail">
        <strong>Date Registered:</strong>
        <div className="adminhome-modal-box">{registrant.date_registered}</div>
      </div>

      {/* ✅ Accept & Decline Buttons */}
      <div className="adminhome-modal-actions">
        <button className="adminhome-modal-accept" onClick={() => handleAccept(registrant.id)}>✔ Accept</button>
        <button className="adminhome-modal-decline" onClick={() => handleDecline(registrant.id)}>✖ Decline</button>
      </div>

      <button className="adminhome-modal-close" onClick={onClose}>Close</button>
    </div>
  </div>
  );
};

export default AdminHomeModal;
