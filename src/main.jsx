import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
// import Root from "./routes/inicio";
import "./index.css";
import Root from "../src/routes/inicio"
import Doctores from "../pages/Doctores";
import Consultas from "../pages/Consultas";
import Portal from "../pages/Portal";

import Medicamentos from "../pages/medicamentos";

import Login from "./Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>404 Not Found</div>,

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
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Medicamentos",
    element: <Medicamentos />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>
);