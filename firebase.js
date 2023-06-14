// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC1LIbRqB839jpaPxjh_pnEZLjp6eR4YU",
  authDomain: "iondelay-lasc.firebaseapp.com",
  projectId: "iondelay-lasc",
  storageBucket: "iondelay-lasc.appspot.com",
  messagingSenderId: "515924723449",
  appId: "1:515924723449:web:89bf8a171879aeca700428",
  measurementId: "G-31TEMF0G3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);