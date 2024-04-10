import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { appFirebase } from '../src/Credentials';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(appFirebase);

const LoginHome = ({ userMail }) => {
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      navigate('/login'); 
    } catch (error) {
     
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
