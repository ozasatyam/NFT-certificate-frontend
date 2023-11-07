// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0uQKzsqv4dubvF2vTyU-I7KiD8FjecfM",
  authDomain: "nft-certificate.firebaseapp.com",
  projectId: "nft-certificate",
  storageBucket: "nft-certificate.appspot.com",
  messagingSenderId: "422665846246",
  appId: "1:422665846246:web:4a44b2315f244e074f2a27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;