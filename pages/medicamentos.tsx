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
        <form className="form" onSubmit={handleSubmit}>
          <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9 2C4.589 2 1 5.589 1 10s3.589 8 8 8c1.846 0 3.543-.633 4.906-1.688l.094-.094 6.281 6.282 1.438-1.438-6.282-6.281.094-.094C16.367 13.543 17 11.846 17 10s-.633-4.543-1.688-5.906l-.094-.094L18.719 1.72l-1.438-1.44-2.593 2.593-.094.094C13.543 2.633 11.846 2 10 2zm0 2c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z" />
          </svg>
          <input
            className="input"
            type="text"
            value={terminoAbuscar}
            onChange={handleChange}
            placeholder="Buscar medicamento..."
          />
          {terminoAbuscar && (
            <button type="button" className="reset" onClick={() => setSearchTerm('')}>
              &times;
            </button>
          )}
          <button type="submit" className="search-btn">Buscar</button>  
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
              {/* Añade más información */}
            </div>
          ))
        ) : (
          <div>
            <p>No se encontraron resultados.</p>
          </div>
        )}
      </div>
    </div>

  );
};

export default Medicamentos;