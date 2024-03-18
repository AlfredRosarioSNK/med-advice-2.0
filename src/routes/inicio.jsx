import {DefaultPlater as Video} from 'react-html5video';
import videoAdn from '../videos/dna-particles.mp4'

import { Link} from "react-router-dom";

export default function Root() {

    return (
      <>

  <div className="menu">
  <nav>
   <ul>
         <li><Link to="/Doctores">Doctores</Link></li>
         <li><Link to="/Consultas">Consultas</Link></li>
         <li><Link to="/Portal">Portal</Link></li>
         
       </ul>

     </nav>
  </div>

  <div className="buscador">
    <input type="text" className='buscar'/>
    {/* <button className='cuenta'></button> */}
    <div className='Cuenta'>
    <li><Link to="/Login">Login</Link></li>
    </div>
    <div>

    </div>
  </div>

  <div className="info">
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sunt ipsum doloribus praesentium voluptatum saepe quasi nisi eaque assumenda necessitatibus facilis hic placeat vero quia cumque maxime, qui officiis! Incidunt.</p>
  </div>

  <div className="adn">
  <video autoPlay loop muted playsInline>
          <source src={videoAdn} type="video/webm" />
        </video>
  </div>

      </>
    );
  }