import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLl5UTUm-C26XYt3ZIoSgm4eYjhADFNQE",
  authDomain: "swiggy-ef674.firebaseapp.com",
  projectId: "swiggy-ef674",
  storageBucket: "swiggy-ef674.firebasestorage.app",
  messagingSenderId: "808109522029",
  appId: "1:808109522029:web:6487e5058a65d2f5ea5364",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
