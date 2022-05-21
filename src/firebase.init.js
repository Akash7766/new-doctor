// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW6ZNeFsJsnneVKnfwjUHXMWzIirG0SX0",
  authDomain: "auth-library-14631.firebaseapp.com",
  projectId: "auth-library-14631",
  storageBucket: "auth-library-14631.appspot.com",
  messagingSenderId: "923129698009",
  appId: "1:923129698009:web:3f1d260c3dc238f0db10c8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
