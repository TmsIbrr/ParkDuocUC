import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC53TnjmFfHYmxvPpn9sEHCQuRZkiRPbTE",
  authDomain: "parkduocuc.firebaseapp.com",
  projectId: "parkduocuc",
  storageBucket: "parkduocuc.firebasestorage.app",
  messagingSenderId: "206382098465",
  appId: "1:206382098465:web:9c3a53237e7b6e8ae15b60",
  measurementId: "G-5PW2D6B6YX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);