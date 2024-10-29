// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO8FxssGyR7jCYbj2z9R65P163fkV8T8s",
  authDomain: "awesome-407aa.firebaseapp.com",
  projectId: "awesome-407aa",
  storageBucket: "awesome-407aa.appspot.com",
  messagingSenderId: "540923471998",
  appId: "1:540923471998:web:d6f475dccccc8cd6b8d02f",
  measurementId: "G-DBEPJ0X9R9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore
const analytics = getAnalytics(app); // Optional: Only if you want to use Analytics

export { auth, db }; // Export both auth and db
