// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd4GbSRexmgqwXybyikmhhSHj13uRCq_w",
  authDomain: "reading-list-57165.firebaseapp.com",
  projectId: "reading-list-57165",
  storageBucket: "reading-list-57165.appspot.com",
  messagingSenderId: "756486040210",
  appId: "1:756486040210:web:a7803ec2578ef34b55544b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Storage
const storage = getStorage(app);

export { db, auth, serverTimestamp, storage };