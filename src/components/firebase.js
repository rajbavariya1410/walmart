// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBGtg1Saaw8SBGM5zNQxEbscu4FXfJkJRo",
  authDomain: "login-auth-ad54d.firebaseapp.com",
  projectId: "login-auth-ad54d",
  storageBucket: "login-auth-ad54d.firebasestorage.app",
  messagingSenderId: "237338906401",
  appId: "1:237338906401:web:c023012f5165dc98263860",
  measurementId: "G-9FQV9Q2TCW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
