import React, { useState } from "react";
import BackgroundLoginExampleImage from "../src/images/backgroundLoginExample.jpg";
import profilePicExample from "../src/images/profilePicExample.png";
import { useNavigate } from 'react-router-dom';
import './Login.css'

import appFirebase from "../src/Credentials";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const auth = getAuth(appFirebase);

export const Login = () => {
  const navigate = useNavigate();
  const [registerIn, setRegisterIn] = useState(false);
  const [error, setError] = useState("");

  const oauthfunction = async (e) => {
    e.preventDefault();
    const Oauthmail = e.target.email.value;
    const Oauthpassword = e.target.password.value;

    if (Oauthpassword.length < 8) {
      setError("The password should be at least 8 characters long");
      return; 
    }
    if (registerIn) {
      try {
        await createUserWithEmailAndPassword(auth, Oauthmail, Oauthpassword);
        setError(""); 
        navigate('/loginHome'); // Añade esta línea
      } catch (error) {
        setError("Error during registration: " + error.message);
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, Oauthmail, Oauthpassword);
        setError(""); 
        navigate('/loginHome'); // Añade esta línea
      } catch (error) {
        setError("The password or email is incorrect");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <div className="father">
            <div className="card card-body shadow-lg">
              <img src={profilePicExample} alt="" className="profile-pic--style" />
              {error && <p style={{ color: 'red' }}>{error}</p>} {}
              <form onSubmit={oauthfunction}>
                <input
                  type="text"
                  placeholder="Email"
                  className="login-textBox"
                  id="email"
                  name="email"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="login-textBox"
                  id="password"
                  name="password"
                />
                <button type="submit" className="btn-registerForm--style">
                  {registerIn ? "Sign up" : "Sign in"}
                </button>
              </form>
              <h4>
                {registerIn
                  ? "If you have already an account"
                  : "Don't have an account?"}
                <button
                  onClick={() => setRegisterIn(!registerIn)}
                  className="btn-switch"
                >
                  {registerIn ? "Sign in" : "Sign up"}
                </button>
              </h4>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <img
            src={BackgroundLoginExampleImage}
            className="background-image--size"
            alt="background"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
