// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfYl00WpQRlDSLqEvUsbA72uXvosOyFHY",
  authDomain: "login-d0dc2.firebaseapp.com",
  projectId: "login-d0dc2",
  storageBucket: "login-d0dc2.firebasestorage.app",
  messagingSenderId: "665231216394",
  appId: "1:665231216394:web:cf33db774184a0614ab4f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;