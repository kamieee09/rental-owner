import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAY8mXrB-zCEdTeVZEII80F3CEDKh0J2hE",
  authDomain: "carrental1-7281a.firebaseapp.com",
  projectId: "carrental1-7281a",
  storageBucket: "carrental1-7281a.firebasestorage.app",
  messagingSenderId: "524333903822",
  appId: "1:524333903822:web:2423735736d2bb45fa859f",
  measurementId: "G-DHD5G3S06Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);