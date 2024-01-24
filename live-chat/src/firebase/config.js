// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp, collection, getDocs } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6kKzseBx9KLphHSMlgGVJvx8IQvAyiSA",
  authDomain: "udemy-vue-firebase-sites-9f689.firebaseapp.com",
  projectId: "udemy-vue-firebase-sites-9f689",
  storageBucket: "udemy-vue-firebase-sites-9f689.appspot.com",
  messagingSenderId: "40507489040",
  appId: "1:40507489040:web:2eaee2835da15d1aa60395"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const projectFirestore = getFirestore(app);
const timestamp = serverTimestamp

const projectAuth = getAuth(app)

export { projectAuth, projectFirestore, timestamp };
