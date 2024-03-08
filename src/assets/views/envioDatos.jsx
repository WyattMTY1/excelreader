import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUploader = () => {
  const [excelData, setExcelData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      setExcelData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSendData = () => {
    // Aquí puedes implementar la lógica para enviar los datos a tu API
    if (excelData) {
      const apiUrl = 'URL_DE_TU_API';
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(excelData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data enviada exitosamente:', data);
        })
        .catch((error) => {
          console.error('Error al enviar datos:', error);
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleSendData} disabled={!excelData}>
        Enviar Datos a la API
      </button>
    </div>
  );
};

export default ExcelUploader;
