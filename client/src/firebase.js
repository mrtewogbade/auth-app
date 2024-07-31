// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-358ea.firebaseapp.com",
  projectId: "mern-auth-358ea",
  storageBucket: "mern-auth-358ea.appspot.com",
  messagingSenderId: "1077941709269",
  appId: "1:1077941709269:web:f01bb7ed2e61f8f674b55c",
  measurementId: "G-G94VCGEG7Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
