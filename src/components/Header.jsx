import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import logo from '../logo/logobig.png';

import { FaUserCircle } from "react-icons/fa";

const Header = ({ user }) => {
    const auth = getAuth();


    const refresh = () => {
        window.location.reload(false); // Fuerza un refresco de la página
    };

    const navigate = useNavigate(); // Inicializa useNavigate en tu componente.

    const handleSignOut = async () => {
        try {
            await signOut(auth);
              console.log("Usuario deslogueado");
        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
        }
    };
    
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
                            <Link to="/Portal">Noticias</Link>
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
                {user ? (
                    <>
                        <Link to="/Profile">
                            <FaUserCircle size={30} /> {/* Icono de perfil */}
                        </Link>
                        <button onClick={handleSignOut} className="login-button">Cerrar sesión</button>
                    </>
                ) : (
                    <>
                        <Link to="/register" className="Register-button">Registrarse</Link>
                        <Link to="/login" className="login-button">Iniciar sesión</Link>
                    </>
                )}
            </div>
                    </div>
                </div>
                <div className="header-contact">
                    <button onClick={handleSignOut} className="login-button">Cerrar sesión</button>
                    {user && (
                        <Link to="/Profile">
                            <FaUserCircle size={30} /> {/* Icono de perfil */}
                        </Link>
                    )}
                </div>
            </header>
        </>
    );
};
export default Header;