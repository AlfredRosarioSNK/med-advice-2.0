import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import logo from '../logo/logobig.png';
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from '../AuthContext';
import Blog from "../../pages/Blog";
const Header = () => {
    const { currentUser } = useAuth();

    const navigate = useNavigate();

    const handleSignOut = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            console.log("Usuario deslogueado");
            navigate('/login'); // Prueba de logout.
        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
        }
    };
    return (
        <header className="header">
            {/* Barra superior */}
            <div className="top-bar">
                <div className="container d-flex justify-content-between">
                    <span>ABIERTO TODOS LOS DIAS DE LA SEMANA DE 8:30 AM A 6:30 PM</span>
                    <div className="top-links">
                        <Link to="/Portal">Historia</Link>
                        <Link to="/Portal">Carreras</Link>
                        <Link to="/Portal">Noticias</Link>
                        <Link to="/Portal">Política de privacidad</Link>
                    </div>
                </div>
            </div>

            <div className="main-nav">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="logo">
                        <Link to="/"><img src={logo} alt="SaludConecta" /></Link>
                    </div>
                    <nav className="nav">
                        <Link to="/Portal" className="nav-link">SERVICIOS</Link>
                        <Link to="/Doctores" className="nav-link">DOCTORES</Link>
                        <Link to="/Calendario" className="nav-link">CALENDARIO</Link>
                        <div className="nav-item dropdown">
                            <span className="nav-link">CONSULTAR</span>
                            <div className="dropdown-menu">
                                <Link to="/ConsultasMedicas" className="dropdown-item">Medicos</Link>
                                <Link to="/Medicamentos" className="dropdown-item">Medicamentos</Link>
                            </div>
                        </div>
                        <Link to="/Blog" className="nav-link">BLOG</Link>
                        <Link to="/Contactanos" className="nav-link">CONTACTANOS</Link>
                    </nav>
                    <div className="header-contact">
                        {currentUser ? (
                            <>
                                <Link to="/Profile">
                                    <FaUserCircle size={30} />
                                    {currentUser.email}
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
        </header>
    );
};
export default Header;