import React from 'react';
import "../styles/Doctores-style.css";
import Header from '../src/components/Header';

const doctores = [
  {
    nombre: "Lacy Smith, MD",
    title: "Chief Medical Officer & Faculty Physician",
    bio: "Dr. Smith joined Cahaba Medical Care in 2010 and worked with Dr. Waits to transition CMC into a FQHC as well as assisted in co-founding.",
    imageUrl: "path-to-lacy-smith-image.jpg"
  },
  // más doctores
];

const Doctores = () => {
  return (
    <div>
    <Header />
    <div classnombre="doctores-section">
      <h2>CLINIC STAFF</h2>
      <div classnombre="doctores-container">
        {doctores.map((doctor, index) => (
          <div classnombre="doctor-card" key={index}>
            <img src={doctor.imageUrl} alt={doctor.nombre} classnombre="doctor-image" />
            <h3>{doctor.nombre}</h3>
            <p classnombre="doctor-title">{doctor.title}</p>
            <p classnombre="doctor-bio">{doctor.bio}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Doctores;

