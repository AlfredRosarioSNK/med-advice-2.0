// Inicio.jsx
import React from "react";
import { Link } from "react-router-dom";
import videoAdn from '../videos/dna-particles.mp4';
import logo from '../logo/logobig.png';
import Header from '../components/Header';
import Slider from '../components/Slider';
// Asegúrate de tener un componente SliderComponent para importar aquí
// import SliderComponent from './SliderComponent';

const Inicio = () => {
  return (
    <>
  <Header />
  <div className="slider-container">
  <Slider />
</div>
    </>
  );
}
export default Inicio;