// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS3kyMa8U7P4Gr1D6NbXg0LW2pa3Er98E",
  authDomain: "muso-ninja-426f1.firebaseapp.com",
  projectId: "muso-ninja-426f1",
  storageBucket: "muso-ninja-426f1.appspot.com",
  messagingSenderId: "142609997823",
  appId: "1:142609997823:web:3b14ecea099ecf344b51ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(app);
const timestamp = serverTimestamp;
const projectAuth = getAuth(app);
const projectStorage = getStorage(app);

export { projectFirestore, timestamp, projectAuth, projectStorage }