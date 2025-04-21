import React from "react";
import { db } from "../firebaseConfig";
import { doc, deleteDoc, getDoc, addDoc, collection, getDocs } from "firebase/firestore";
import "../styles/components/adminhomemodal.css"; // Separate CSS for this modal

const AdminHomeModal = ({ isOpen, onClose, registrant }) => {
  if (!isOpen || !registrant) return null;

  // ✅ Accept Function
  const handleAccept = async () => {
    try {
      const registrantRef = doc(db, "registrants", registrant.id);

      // Get the registrant data
      const registrantSnapshot = await getDoc(registrantRef);
      if (registrantSnapshot.exists()) {
        const registrantData = registrantSnapshot.data();

        // Extract the graduation year
        const year = registrantData.year_graduated.split("-")[0]; // Extract the year part (e.g., "2025")

        // Fetch the total count of alumni
        const alumniSnapshot = await getDocs(collection(db, "alumni"));
        const count = alumniSnapshot.size + 1; // Increment count for the new alumni

        // Generate the unique alumni_ID
        const alumniID = `${year}${String(count).padStart(3, "0")}`; // e.g., 2025005

        // Add the registrant data to the alumni collection with the new alumni_ID
        await addDoc(collection(db, "alumni"), {
          alumni_ID: alumniID, // Automatically generated alumni ID
          name: registrantData.name,
          email: registrantData.email,
          course_graduated: registrantData.course_graduated,
          year_graduated: registrantData.year_graduated,
          date_registered: registrantData.date_registered,
          current_address: registrantData.current_address,
          phone_number: registrantData.phone_number,
          password: registrantData.password, // If needed
          roles: registrantData.roles, // Copy roles from registrants
        });

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

  // ❌ Decline Function
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
          <button className="adminhome-modal-accept" onClick={handleAccept}>✔ Accept</button>
          <button className="adminhome-modal-decline" onClick={handleDecline}>✖ Decline</button>
        </div>

        <button className="adminhome-modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AdminHomeModal;
