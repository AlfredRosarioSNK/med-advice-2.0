import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import appFirebase from '../src/Credentials';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(appFirebase);

const LoginHome = ({ userMail }) => {
  const navigate = useNavigate(); // Crear la instancia de navigate

  const handleLogout = async () => {
    try {
      await signOut(auth); // Intenta cerrar la sesión
      navigate('/login'); // Redirecciona al usuario a la página de login o inicio
    } catch (error) {
      // Maneja posibles errores aquí
      console.error("Error during sign out: ", error);
    }
  };

  return (
    <div>
      <h2 className='text-center'>
        Welcome {userMail} <button className='btn btn-primary' onClick={handleLogout}>Log out</button>
      </h2>
    </div>
  );
};

export default LoginHome;
