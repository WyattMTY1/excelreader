import React, { useState, useEffect } from 'react';
function Respuesta() {
    const [apiData, setApiData] = useState([]);
    useEffect(() => {
        // Lógica para obtener datos de la API
        fetchDataFromApi();
      }, []); // Se ejecutará solo una vez al montar el componente
      const fetchDataFromApi = async () => {
        try {
          // Reemplaza 'URL_DE_TU_API' con la URL real de tu API
          const apiUrl = 'http://localhost:8080/excel/getExcelUsuariosV2';
          const response = await fetch(apiUrl);
          const data = await response.json();
    
          setApiData(data);
        } catch (error) {
          console.error('Error al obtener datos de la API:', error);
        }
      };
      return (
        <div>
          <h2>Datos de la API:</h2>
          <ul>
            {console.log(apiData)}
            {apiData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      );
    
}
export default Respuesta;