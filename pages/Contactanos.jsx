// import React from "react";
// import Header from "../src/components/Header";
// import Footer from "../src/components/Footer";
// import GoogleMapReact from "google-map-react";
// import "../styles/Contactanos.css";

// export default function Contactanos() {
//   return (
//     <div className="contactanos-container">
//       <Header />
//       <div className="content">
//         <div className="map-container">
//           <GoogleMapReact
//             bootstrapURLKeys={{ key: "AIzaSyAmOhaz5-RXvxcsNwdlps7YkDQ4E6GgvOU" }}
//             defaultCenter={{ lat: 19.12446021159034, lng: -70.64003990685623 }}  
//             defaultZoom={10}
//             markers={[{ lat: 19.12446021159034, lng: -70.64003990685623 }]}
//           />
     
//         <div className="cards-map1">
//           <p>si</p>
//         </div>
//         <div className="cards-map2">
//         <p>si</p>
//         </div>
//         <div className="cards-map3">
//         <p>si</p>
//         </div>
//         <div className="cards-map4">
//         <p>si</p>
//         </div>
//         </div>
//       </div>
     

      
//     <Footer/>
//     </div>
//   );
// }

import React from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import GoogleMapReact from "google-map-react";
import "../styles/Contactanos.css";

export default function Contactanos() {
  return (
    <div className="contactanos-container">
      <Header />
      <div className="content">
        <div className="map-and-cards-container">
          <div className="map-container">
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyAmOhaz5-RXvxcsNwdlps7YkDQ4E6GgvOU" }}
              defaultCenter={{ lat: 19.12446021159034, lng: -70.64003990685623 }}  
              defaultZoom={10}
              markers={[{ lat: 19.12446021159034, lng: -70.64003990685623 }]}
            />
          </div>
         
        </div>
      </div>
      <Footer/>
    </div>
  );
}
