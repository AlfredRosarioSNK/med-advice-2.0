
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Contactanos from "../pages/Contactanos";
import Calendario from "../pages/Calendario";
import Profile from '../pages/user/Profile';
import Header from "./components/Header";
import Error404 from "./components/Error";
import { appFirebase } from "./Credentials"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Blog from "../pages/Blog";
import { AuthProvider } from "./AuthContext";

import Root from "./routes/inicio";
import Doctores from "../pages/Doctores";
import Consultas from "../pages/Consultas";
import Portal from "../pages/Portal";
import Medicamentos from "../pages/medicamentos";
import Login from "./Login"; 
import LoginHome from "../pages/LoginHome";
import News from '../pages/News'; 
import ConsultasMedicas from "../pages/consultas-medicas";
import LoadingAnimation from "./components/LoadingAnimation"; 
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
      setLoading(false); 
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
 
    return <LoadingAnimation />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <Error404/>,
    },
   
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

    {
      path: "/News",
      element: <News />,

    },
    {   
      path: "/Profile",
      element: user ? <Profile /> : <Login />, 
    },
    {
      path: "/Calendario",
      element: <Calendario />,
    },
    {
      path: "/Blog",
      element: <Blog />,
    },
    {   
      path: "/ConsultasMedicas",
      element: user ? <    ConsultasMedicas /> : <Login />, 
    },

    {
      path: "/LoginHome",
      element: <LoginHome userMail={user ? user.email : ''} />,
    },
    
  ].filter(Boolean)); // Filtra las rutas no definidas para usuarios no autentificados

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
    <AuthProvider> 
      <App />
    </AuthProvider>
  </React.StrictMode>
);