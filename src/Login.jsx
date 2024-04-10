import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Login.module.css';

import appFirebase from "../src/Credentials";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Profile from '../pages/user/Profile';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

export const Login = () => {
  const navigate = useNavigate();
  const [registerIn, setRegisterIn] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const oauthfunction = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const Oauthmail = e.target.email.value;
    const Oauthpassword = e.target.password.value;
    const username = registerIn ? e.target.username.value : undefined;


    if (Oauthpassword.length < 8) {
      setError("The password should be at least 8 characters long");
      return;
    }

    if (registerIn) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, Oauthmail, Oauthpassword);
        const user = userCredential.user;
        const role = e.target.role.value;

        // Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: Oauthmail,
          username: username,
          role: role, // rol del usuario
        });

        setError("");
        navigate('/Profile'); 
      } catch (error) {
        setError("Error during registration: " + error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, Oauthmail, Oauthpassword);
        setError("");
        navigate('/Inicio');
      } catch (error) {
        setError("The password or email is incorrect");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeader}>{registerIn ? 'Crear una cuenta' : 'Iniciar sesión'}</h2>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <form onSubmit={oauthfunction}>
            {registerIn && (
              <div className={styles.inputGroup}>
                <select
                  required={registerIn}
                  id="role"
                  name="role"
                  className={styles.inputField}
                >
                  <option value="">Selecciona tu rol</option>
                  <option value="usuario">Usuario</option>
                  <option value="medico">Médico</option>
                </select>
                <label htmlFor="role" className={styles.inputLabel}>
                </label>
              </div>
            )}
             {registerIn && (
            <div className={styles.inputGroup}>
              <input
                type="text"
                required={registerIn}
                autoComplete="off"
                id="username"
                name="username"
                className={styles.inputField}
                placeholder=" "
              />
              <label htmlFor="username" className={styles.inputLabel}>
                Nombre de usuario
              </label>
            </div>
)}
            <div className={styles.inputGroup}>
              <input
                type="email"
                required
                autoComplete="off"
                id="email"
                name="email"
                className={styles.inputField}
                placeholder=" "
              />
              <label htmlFor="email" className={styles.inputLabel}>
                Correo
              </label>
            </div>
            <div className={styles.inputGroup}>
              <input
                type="password"
                required
                autoComplete="off"
                id="password"
                name="password"
                className={styles.inputField}
                placeholder=" "
              />
              <label htmlFor="password" className={styles.inputLabel}>
                Contraseña
              </label>
            </div>
            <button type="submit" className={styles.btnAnimated}>
              {registerIn ? 'Crear cuenta' : 'Iniciar sesión'}
            </button>
          </form>
          <div className={styles.switchContainer}>
            <h4>
              {registerIn ? '¿Ya tienes una cuenta?' : '¿No tienes una cuenta?'}
            </h4>
            <button onClick={() => setRegisterIn(!registerIn)} className={styles.btnSwitch}>
              {registerIn ? 'Iniciar sesión' : 'Crear cuenta'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
