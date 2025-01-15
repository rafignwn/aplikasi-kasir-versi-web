// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfEevsVyYh7vrdm8EJWkdeYVwS0ikxyyc",
  authDomain: "aplikasi-kasir-75880.firebaseapp.com",
  projectId: "aplikasi-kasir-75880",
  storageBucket: "aplikasi-kasir-75880.firebasestorage.app",
  messagingSenderId: "20645580170",
  appId: "1:20645580170:web:5940de83f6f1c758854c73",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app, "pos-app-d750a.appspot.com");
