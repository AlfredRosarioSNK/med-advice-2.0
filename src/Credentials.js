// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmeTV-er5nFX3Q662XanRWiHMnswZ-j-8",
  authDomain: "med-advice-3f48c.firebaseapp.com",
  projectId: "med-advice-3f48c",
  storageBucket: "med-advice-3f48c.appspot.com",
  messagingSenderId: "215133402368",
  appId: "1:215133402368:web:ae1506628ab8a9755cefe5",
  measurementId: "G-2TX0LTGHRG"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

export default appFirebase