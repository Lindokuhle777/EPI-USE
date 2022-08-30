// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { getAuth } from "firebase/auth";
// import dotenv from "dotenv";

// dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRJWmKD-oiKA_voeD8ASEqiUhwS6rFICw",
  authDomain: "epi-use-technical-assess-e42b5.firebaseapp.com",
  projectId: "epi-use-technical-assess-e42b5",
  storageBucket: "epi-use-technical-assess-e42b5.appspot.com",
  messagingSenderId: "823117866077",
  appId: "1:823117866077:web:e87e96224fc1ccf40719b4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);