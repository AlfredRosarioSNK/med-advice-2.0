// Inicio.jsx
import React from "react";
import { Link } from "react-router-dom";
import videoAdn from '../videos/dna-particles.mp4';
import logo from '../logo/logobig.png';
import Header from '../components/Header';
import Slider from '../components/Slider';
// Asegúrate de tener un componente SliderComponent para importar aquí
// import SliderComponent from './SliderComponent';
import healthKid from '../images/health-kid.jpg';
import mediBg from '../images/medibg.jpg';

const Inicio = () => {
  return (
    <>
  <Header />
  <div className="slider-container">
  <Slider />
</div>
<div className="info-section">
    <div className="info-card">
        <div className="icon">

        </div>
        <h3>AMBULATORIA</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>
    </div>
    <div className="info-card">
        <div className="icon">

        </div>
        <h3>VACUNACIÓN</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>
    </div>
    <div className="info-card">
        <div className="icon">

        </div>
        <h3>CIRUGÍA GENERAL</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>
    </div>
    <div className="info-card">
        <div className="icon">

        </div>
        <h3>MÉDICOS</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut</p>
    </div>
</div>
    </>
  );
}
export default Inicio;