import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    // Your web app's Firebase configuration
    apiKey: "AIzaSyC0QuTUMp1dEUgLb5h8oIEg5ITyK0ZKDys",
    authDomain: "ieee-hack.firebaseapp.com",
    projectId: "ieee-hack",
    storageBucket: "ieee-hack.appspot.com",
    messagingSenderId: "1059500581233",
    appId: "1:1059500581233:web:c058d91c68c628e384d6d0",
    measurementId: "G-9B66NJ8LZ0"
  };

initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();