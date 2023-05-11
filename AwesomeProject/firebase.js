import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFkQzK6JWbdlg5FJscKRTgY1A3Sl3hjIU",
  authDomain: "awesomeproject-4a1e3.firebaseapp.com",
  projectId: "awesomeproject-4a1e3",
  storageBucket: "awesomeproject-4a1e3.appspot.com",
  messagingSenderId: "510048795064",
  appId: "1:510048795064:web:144b959a01d473ca26b74d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export { auth, db };
