import React from 'react';
import appFirebase from '../Credentials';
import { getAuth, signOut } from 'firebase/auth';

const auth = getAuth(appFirebase);

const Home = ({ userMail }) => {
  return (
    <div>
      {}
      <h2 className='text-center'>
        Welcome {userMail} <button className='btn btn-primary' onClick={() => signOut(auth)}>Log out</button>
      </h2>
    </div>
  );
};

export default Home;
