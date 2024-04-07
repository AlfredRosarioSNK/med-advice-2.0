
import * as React from "react";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Root from "./routes/inicio";
import Doctores from "../pages/Doctores";
import Consultas from "../pages/Consultas";
import Portal from ".../pages/Portal";  
import News from "../pages/News";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/Doctores" element={<Doctores />} />
      <Route path="/Consultas" element={<Consultas />} />
      <Route path="/Portal" element={<Portal />} />
      <Route path="/loginHome" element={<LoginHome />} />
      <Route path="/News" element={<News />} />
    </Routes>

  );
}

export default App;
