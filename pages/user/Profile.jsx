import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import LoadingAnimation from "../../src/components/LoadingAnimation"; 
import  "../../styles/Profile.css";
import userpic from "../../src/assets/userpic.png";

const Profile = () => {
  const [profile, setProfile] = useState({ fullName: '', age: '', weight: '', allergies: '' , photoURL:userpic });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
  
    const startTime = Date.now(); // Guarda el tiempo inicial
  
    const fetchUserProfile = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
      } finally {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        const delay = 2000 - elapsedTime; // Calcula cuánto tiempo falta hasta 2 segundos
  
        setTimeout(() => {
          setLoading(false); // Termina la carga después de al menos 2 segundos
        }, delay > 0 ? delay : 0); // Asegura que el retraso no sea negativo
      }
    };
  
    fetchUserProfile();
  }, [navigate, user, db]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", user.uid), profile);
      alert('Perfil actualizado correctamente.');
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  if (loading) {
    // Muestra la animación de carga mientras el estado es `loading`
    return <LoadingAnimation />;
  }


  return (
    <div className="profile-page-container">
      {loading ? (
        <LoadingAnimation />
      ) : (
        <div className="profile-container">
          <div className="profile-header">
            <img src={profile.photoURL ||userpic} alt="Profile" className="profile-picture" />
            <h2>{profile.fullName || 'Tu Nombre'}</h2>
            <button className="change-photo-btn">Cambiar Foto</button>
          </div>
          <div className="profile-details">
            <form className="profile-form" onSubmit={handleSubmit}>
              <label htmlFor="fullName">Nombre Completo:</label>
              <input id="fullName" name="fullName" type="text" value={profile.fullName} onChange={handleChange} />

            
            <label htmlFor="age">Edad:</label>
            <input id="age" name="age" type="number" value={profile.age} onChange={handleChange} />

            <label htmlFor="weight">Peso:</label>
            <input id="weight" name="weight" type="text" value={profile.weight} onChange={handleChange} />
            
            <label htmlFor="allergies">Alergias:</label>
            <input id="allergies" name="allergies" type="text" value={profile.allergies} onChange={handleChange} />
            

            <button type="submit" className="save-changes-btn">Guardar Cambios</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;