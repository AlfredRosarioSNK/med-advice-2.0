'use client';
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import '../styles/Medicamentos-style.css';
import Header from '../src/components/Header';

interface Medicamento {
  product_ndc: string[];
  generic_name: string[];

  openfda: {
    product_ndc?: string[];
    brand_name?: string[];
    manufacturer_name?: string[];
    substance_name?: string[]; // Nombre de la sustancia activa
    route?: string[]; // Vía de administración oral, intravenosa, etc.
    application_number?: string[];
    rxcui?: string[]; // Códigos RxNorm
    spl_set_id?: string[]; // Identificadores del producto
    is_original_packager?: boolean[]; // Indica si el registrante es el envasador original
    package_ndc?: string[]; // NDC del paquete
    pharm_class_epc?: string[]; // Clase farmacológica establecida por efecto
    pharm_class_pe?: string[]; // Clase farmacológicapor propiedad
    unii?: string[]; // Identificador Único de Ingredientes no clasificados
  };

  // Propiedades fuera de openfda
  dosage_and_administration?: string[];
  indications_and_usage?: string[];
  warnings?: string[];
  purpose?: string[];
  active_ingredient?: string[];
  inactive_ingredient?: string[];
  directions?: string[]; // Direcciones para el uso del producto
  storage_and_handling?: string[];
}



const Medicamentos: React.FC = () => {
  const [terminoAbuscar, setSearchTerm] = useState('');
  const [results, setResults] = useState<Medicamento[]>([]); // Utiliza la interfaz para el tipo de estado

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fetchedResults = await fetchMedicamentos(terminoAbuscar);
    setResults(fetchedResults);
  };

  const fetchMedicamentos = async (searchTerm: string) => {
    const apiKey = 'uFClUXq2QBQixRfW58bHtw0C2hVeqI8rVMKA5IvC'; //hay que guardarla
    const endpoint = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:"${searchTerm}"&limit=1&api_key=${apiKey}`;

    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results as Medicamento[]; // Asegurense de castear a 'Medicamento'
    } catch (error) {
      console.error("Error fetching data: ", error);
      return []; // Retorna un arreglo vacío en caso de error
    }
  };

  return (
    <div>
      <Header />
      <div className="search-container">
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              value={terminoAbuscar}
              onChange={handleChange}
              placeholder="Buscar medicamento..."
            />
            <span className="focus-border"></span>
          </div>
          <button type="submit">Buscar</button>
        </form>
      </div>

        <div className={`search-results ${results.length > 0 ? 'show' : ''}`}>
          {Array.isArray(results) && results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="search-result-item">
                <h3>{result.openfda?.brand_name?.join(', ') || 'Nombre no disponible'}</h3>
                <p><strong>NDC:</strong> {result.openfda?.product_ndc?.join(', ') || 'N/A'}</p>
                <p><strong>Fabricante:</strong> {result.openfda?.manufacturer_name?.join(', ') || 'N/A'}</p>
                <p><strong>Sustancia Activa:</strong> {result.openfda?.substance_name?.join(', ') || 'N/A'}</p>
                {/* Añade aquí más información del medicamento si es necesario */}
              </div>
            ))
          ) : (
            <div>
              <p>No se encontraron resultados o hubo un error.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Medicamentos;