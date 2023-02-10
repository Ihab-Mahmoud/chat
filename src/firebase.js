import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBhp6M3Uuj8qtaCM8GKBAQzpujzChmrXgM",
    authDomain: "ihab-chat.firebaseapp.com",
    projectId: "ihab-chat",
    storageBucket: "ihab-chat.appspot.com",
    messagingSenderId: "829881071747",
    appId: "1:829881071747:web:1e8ab474fe297e53c6c3b6",
    measurementId: "G-0H63SPXNPD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);