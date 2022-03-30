// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";

import { getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getDatabase} from 'firebase/database';
import {axios} from 'axios'

console.log("data")

fetch("http://localhost:5001/nkululeko-store/us-central1/app", {mode: "no-cors"})
.then((response) => {
    console.log(response)
})

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDqZZ98FjdW_US5jmXUJKjH3slgUmUB7f0",
    authDomain: "nkululeko-store.firebaseapp.com",
    databaseURL: "https://nkululeko-store-default-rtdb.firebaseio.com",
    projectId: "nkululeko-store",
    storageBucket: "nkululeko-store.appspot.com",
    messagingSenderId: "483233806135",
    appId: "1:483233806135:web:580d23c5ba78eb87dd8cb2",
    measurementId: "G-DFB1ZP5D02"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, db, storage, analytics, database }