// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5S5eratKXMn2mbHJhlu9VqdnAHh9HW7c",
  authDomain: "pos-app-d750a.firebaseapp.com",
  databaseURL:
    "https://pos-app-d750a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pos-app-d750a",
  storageBucket: "pos-app-d750a.appspot.com",
  messagingSenderId: "58415204118",
  appId: "1:58415204118:web:3ba14e1bd7a236527d3237",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
