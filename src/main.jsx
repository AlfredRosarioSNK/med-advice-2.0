
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Importando componentes y configuración de Firebase
import appFirebase from "./Credentials"; // Asegúrate de que la ruta sea correcta
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Importando vistas o componentes
import Root from "./routes/inicio";
import Doctores from "../pages/Doctores";
import Consultas from "../pages/Consultas";
import Portal from "../pages/Portal";
import Medicamentos from "../pages/medicamentos";
import Login from "./Login"; // Asegúrate de que la ruta sea correcta
import LoginHome from "../pages/LoginHome"; // Asume que este es el componente para usuarios autenticados
import News from '../pages/News'; 

const auth = getAuth(appFirebase);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
      if (userFirebase) {
        setUser(userFirebase);
      } else {
        setUser(null);
      }
    });
    return unsubscribe; // Esto es para desuscribirse del observador cuando el componente se desmonta
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <div>404 Not Found</div>,
    },
    // Las siguientes rutas son accesibles sin autenticación
    {
      path: "/Doctores",
      element: <Doctores />,
    },
    {
      path: "/Consultas",
      element: <Consultas />,
    },
    {
      path: "/Portal",
      element: <Portal />,
    },
    {
      path: "/Medicamentos",
      element: <Medicamentos />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/News",
      element: <News />,

    },
    // Esta ruta requiere autenticación para ser accesible
    {
      path: "/LoginHome",
      element: <LoginHome userMail={user ? user.email : ''} />,
    },
  ].filter(Boolean)); // Filtra las rutas no definidas para usuarios no autenticados

  return (
    <RouterProvider router={router} />
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
