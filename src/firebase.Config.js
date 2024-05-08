// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCriTdLW9ptk3kZbGLKuRnF7yni3Eu-Eic",
  authDomain: "fir-basics-7c53d.firebaseapp.com",
  projectId: "fir-basics-7c53d",
  storageBucket: "fir-basics-7c53d.appspot.com",
  messagingSenderId: "868737772223",
  appId: "1:868737772223:web:08a8e216f2d64bd92f340a",
  measurementId: "G-W6BBHEESY6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
