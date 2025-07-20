import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2y7QCbx2q34TgyiWpkqHIyCFMh-dhEaQ",
  authDomain: "animate-with-spring.firebaseapp.com",
  projectId: "animate-with-spring",
  storageBucket: "animate-with-spring.firebasestorage.app",
  messagingSenderId: "892736270792",
  appId: "1:892736270792:web:abbd3ba5bc3fe08ee6d0fd",
  measurementId: "G-5983EEEM9P",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };
