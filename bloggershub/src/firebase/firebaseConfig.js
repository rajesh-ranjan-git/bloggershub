// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA_z_iAdEzTD523llLVb2tOl7jDKYRj8z4",
  authDomain: "bloggershub-fb2bb.firebaseapp.com",
  projectId: "bloggershub-fb2bb",
  storageBucket: "bloggershub-fb2bb.firebasestorage.app",
  messagingSenderId: "1065652219817",
  appId: "1:1065652219817:web:5f504f7272eb0772e85eb8",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
