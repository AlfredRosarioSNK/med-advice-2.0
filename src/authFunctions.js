import { getFirestore, doc, setDoc } from "firebase/firestore";
import appFirebase from "./Credentials"; // Asegúrate de que la ruta sea correcta
import { getAuth } from "firebase/auth";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export const createUserProfile = async (userId, role) => {
  await setDoc(doc(db, "users", userId), {
    role: role,
  });
};
