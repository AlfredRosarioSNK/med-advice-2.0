import * as React from "react";
import { Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Root from "./routes/inicio";
import Doctores from "./Doctores";
import Consultas from "./Consultas";
import Portal from "./Portal";

function App() {
  return (

    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/Doctores" element={<Doctores />} />
      <Route path="/Consultas" element={<Consultas />} />
      <Route path="/Portal" element={<Portal />} />
    </Routes>

  );
}

export default App;
