// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
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