import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer(){
    return(
      <footer className="footer">
  
  <div className="footer-content">
    <div className="contact-info">
      <h3>Contactanos</h3>
      <p>Dirección: Calle Principal 123</p>
      <p>Teléfono: 123-456-7890</p>
      <p>Email: info@Mhadvice.com</p>
    </div>
    <div className="social-links">
      <h3>Síguenos en redes sociales</h3>
      <ul>
        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a></li>
        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a></li>
        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a></li>
      </ul>
    </div>
  </div>
  <hr/>
  <div className="copyright">
    <p>© {new Date().getFullYear()} Mhadvice. Todos los derechos reservados.</p>
  </div>
</footer>
    )
} 