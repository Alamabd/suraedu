// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0gFq9NNl3evbinAE5rCTG19Y-rXSUeCM",
  authDomain: "suraedu-26d7e.firebaseapp.com",
  projectId: "suraedu-26d7e",
  storageBucket: "suraedu-26d7e.firebasestorage.app",
  messagingSenderId: "350138551230",
  appId: "1:350138551230:web:a01f0255046cf9ffb247ef",
  measurementId: "G-NZV42R2MQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);