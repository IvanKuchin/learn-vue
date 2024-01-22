import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB6kKzseBx9KLphHSMlgGVJvx8IQvAyiSA",
    authDomain: "udemy-vue-firebase-sites-9f689.firebaseapp.com",
    projectId: "udemy-vue-firebase-sites-9f689",
    storageBucket: "udemy-vue-firebase-sites-9f689.appspot.com",
    messagingSenderId: "40507489040",
    appId: "1:40507489040:web:168308379e8fb93ba60395"
  };

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, timestamp }