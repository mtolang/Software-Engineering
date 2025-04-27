import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6qyIKrYd-K6g-LksBb7TAQzwA4cTDkZw",
  authDomain: "se-project-bd5e8.firebaseapp.com",
  projectId: "se-project-bd5e8",
  storageBucket: "se-project-bd5e8.appspot.com", // ✅ Fixed
  messagingSenderId: "917981509276",
  appId: "1:917981509276:web:efb69b1ae82b7bfecadf59",
  measurementId: "G-JFC2TCZCJL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // ✅ Export Firestore
export const auth = getAuth(app); // Initialize Firebase Auth
