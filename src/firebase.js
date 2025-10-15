// src/firebase.js

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG_jaCZ1ZdA0LHPbSw_7iWuGmLl2Ie5z4",
  authDomain: "ai-interviewer-03.firebaseapp.com",
  projectId: "ai-interviewer-03",
  storageBucket: "ai-interviewer-03.firebasestorage.app",
  messagingSenderId: "537027019595",
  appId: "1:537027019595:web:6162f71bf3cc4509f79ece",
  measurementId: "G-W7NPM89G3R",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// ✅ Auth Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// ✅ Export everything you need
export { analytics, auth, db, githubProvider, googleProvider };

