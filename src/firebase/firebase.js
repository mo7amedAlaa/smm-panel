// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCUv01QDSr6y8CGH_LW8wLQOh32FXu7524",
  authDomain: "smm-panel-5bae7.firebaseapp.com",
  projectId: "smm-panel-5bae7",
  storageBucket: "smm-panel-5bae7.firebasestorage.app",
  messagingSenderId: "398827610833",
  appId: "1:398827610833:web:77f5c9abc5a08b0e1e1bf0",
  measurementId: "G-W2JQKMWE41",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
