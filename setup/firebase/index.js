// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaofHdGkf4l_tcM641raNiwDYbYn3fPyw",
  authDomain: "ricqcodes-proposal-app.firebaseapp.com",
  projectId: "ricqcodes-proposal-app",
  storageBucket: "ricqcodes-proposal-app.appspot.com",
  messagingSenderId: "674874270406",
  appId: "1:674874270406:web:9852c86244eb65de4a2dc7",
  measurementId: "G-WBZN3SCMZC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const analytics = getAnalytics(app);
