import React from "react";
import { Link } from "react-router-dom";
import logo from '../logo/logobig.png';

const Header = () => {
    return (
        <>
            <header className="header">
                {/* Barra superior */}
                <div className="top-bar">
                    <div className="container d-flex justify-content-between">
                        <span>ABIERTO TODOS LOS DIAS DE LA SEMANA DE 8:30 AM A 6:30 PM</span>
                        <div className="top-links">
                            <Link to="/Portal">Historia</Link>
                            <Link to="/Portal">Carreras</Link>
                            <Link to="/News">Noticias</Link>
                            <Link to="/Portal">Politica de privacidad</Link>
                        </div>
                    </div>
                </div>

                {/* Navegación principal */}
                <div className="main-nav">
                    <div className="container d-flex justify-content-between align-items-center">
                        <div className="logo">
                            {/* Inserta aquí tu logo */}
                            <Link to="/Portal"><img src={logo} alt="SaludConecta" /></Link>
                        </div>
                        <nav className="nav">
                            <Link to="/Portal" className="nav-link">SERVICIOS</Link>
                            <Link to="/Doctores" className="nav-link">DOCTORES</Link>
                            <Link to="/Calendario" className="nav-link">CALENDARIO</Link>
                            <div className="nav-item dropdown">
                                <span className="nav-link">CONSULTAR</span>
                                <div className="dropdown-menu">
                                    <Link to="/consultas-medicas" className="dropdown-item">Medicos</Link>
                                    <Link to="/Medicamentos" className="dropdown-item">Medicamentos</Link>
                                </div>
                            </div>
                            <Link to="/Portal" className="nav-link">BLOG</Link>
                            <Link to="/Contactanos" className="nav-link">CONTACTANOS</Link>
                        </nav>
                        <div className="header-contact">
                            <span className="Register-button">Register </span>
                            <Link to="/Login" className="login-button">LOGIN</Link>
                        </div>
                    </div>
                </div>

                {/* Slider */}
                <div className="slider-container">
                    {/* Aquí iría tu componente de slider. */}
                    {/* <SliderComponent /> */}
                </div>
            </header>
        </>
    );
};

export default Header;