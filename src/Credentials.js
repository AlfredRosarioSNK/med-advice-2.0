import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Importar getFirestore
import { getAuth } from "firebase/auth"; // Importar getAuth

const firebaseConfig = {
  apiKey: "AIzaSyAmeTV-er5nFX3Q662XanRWiHMnswZ-j-8",
  authDomain: "med-advice-3f48c.firebaseapp.com",
  projectId: "med-advice-3f48c",
  storageBucket: "med-advice-3f48c.appspot.com",
  messagingSenderId: "215133402368",
  appId: "1:215133402368:web:ae1506628ab8a9755cefe5",
  measurementId: "G-2TX0LTGHRG"
};

const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);
const db = getFirestore(appFirebase); // Obtener la instancia de Firestore
const auth = getAuth(appFirebase); // Obtener la instancia de Auth

export { appFirebase, analytics, db, auth }; 