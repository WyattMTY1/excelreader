import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelUploader = () => {
  const [clienteInfo, setClienteInfo] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      // Remove the first row (column names)
      jsonData.shift();
      // Transform rows into employee objects
      const employeesArray = jsonData.map((row) => {
        return {
          empresa: row[0],
          nombre: row[1],
          segundoNombre: row[2],
          tercerNombre: row[3],
          apellidoPaterno: row[4],
          apellidoMaterno: row[5],
          fechaDeNacimiento: row[6],
          rfc: row[7],
          idEstado: row[8],
          curp: row[9],
          estadoCivil: row[10],
          telefono: row[11],
          telefonoParticular: row[12],
          correo: row[13],
          observaciones: row[14],
          cardNumber: row[15],

          // Add other properties as needed
        };
      });
 
      // Set employees array to state
      setClienteInfo(employeesArray);
      console.log(employeesArray);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSendData = () => {
    // Aquí puedes implementar la lógica para enviar los datos a tu API
    if (clienteInfo) {
      const apiUrl = 'URL_DE_TU_API';
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteInfo),
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
      <button onClick={handleSendData} disabled={!clienteInfo}>
        Enviar Datos a la API
      </button>
    </div>
  );
};

export default ExcelUploader;
