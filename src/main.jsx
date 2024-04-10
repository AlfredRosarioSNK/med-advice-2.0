
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Contactanos from "../pages/Contactanos";
import Calendario from "../pages/Calendario";
import Profile from '../pages/user/Profile';
import Header from "./components/Header";
// Importando componentes y configuración de Firebase
import appFirebase from "./Credentials"; // Asegúrate de que la ruta sea correcta
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";


// Importando vistas o componentes
import Root from "./routes/inicio";
import Doctores from "../pages/Doctores";
import Consultas from "../pages/Consultas";
import Portal from "../pages/Portal";
import Medicamentos from "../pages/medicamentos";
import Login from "./Login"; // Asegúrate de que la ruta sea correcta
import LoginHome from "../pages/LoginHome";
import News from '../pages/News'; 

const auth = getAuth(appFirebase);

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userFirebase) => {
      if (userFirebase) {
        const userProfileRef = doc(getFirestore(appFirebase), "users", userFirebase.uid);
        const userProfileDoc = await getDoc(userProfileRef);
        if (userProfileDoc.exists()) {
          const userData = userProfileDoc.data();
          setUser({ ...userFirebase, role: userData.role });
        } else {
          console.error("Documento de usuario no encontrado.");
        }
      } else {
        setUser(null);
      }
      setLoading(false); // Indica que la carga ha terminado
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }
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
      element: <Medicamentos />
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Contactanos",
      element: <Contactanos />,
    },
    {
      path: "/inicio",
      element: <Root />,
    },
    // Esta ruta requiere autenticación para ser accesible
    {
      path: "/News",
      element: <News />,

    },
    {
      path: "/Profile",
      element: user ? <Profile /> : <Login />, // Solo muestra el perfil si hay un usuario autenticado
    },
    {
      path: "/Calendario",
      element: <Calendario />,
    },
    // Esta ruta requiere autenticación para ser accesible
    {
      path: "/LoginHome",
      element: <LoginHome userMail={user ? user.email : ''} />,
    },
    
  ].filter(Boolean)); // Filtra las rutas no definidas para usuarios no autenticados

  return (
    <RouterProvider router={router}>
      <Header user={user} />
    </RouterProvider>
  );
}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);    