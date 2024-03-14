import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Medicamentos from '../pages/medicamentos'; // Ajusta la ruta de importación según sea necesario
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Medicamentos />} /> {/* Ruta raíz apuntando a Medicamentos */}
        {/* Puedes agregar más rutas aquí */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
