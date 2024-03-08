import { Table, TableContainer, TableHead, TableRow, TableCell, Paper, TableBody } from "@mui/material";
import { paperPlane } from "fontawesome";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const ExcelUploader = () => {
  const [clienteInfo, setClienteInfo] = useState(null);
  const [apiData, setApiData] = useState([]);
  const apiUrl = "http://localhost:8080/excel/getExcelUsuariosV2";

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
      // Transform rows into apiData objects
      const excelInfo = jsonData.map((row) => {
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

      // Set apiDatas array to state
      setClienteInfo(excelInfo);
      console.log(excelInfo);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleSendData = () => {
    // Aquí puedes implementar la lógica para enviar los datos a tu API
    if (clienteInfo) {
      const requestData = {
        excelInfo: clienteInfo,
      };
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data enviada exitosamente:", data);
          setApiData(data.responseData || []);
        })
        .catch((error) => {
          console.error("Error al enviar datos:", error);
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={handleSendData} disabled={!clienteInfo}>
        Enviar Datos a la API
      </button>
      <h2>apiData Data</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableCell>Nombre</TableCell>
              <TableCell>Segundo Nombre</TableCell>
              <TableCell>Tercer Nombre</TableCell>
              <TableCell>Apellido Paterno</TableCell>
              <TableCell>Apellido Materno</TableCell>
              <TableCell>Fecha de Nacimiento</TableCell>
              <TableCell>RFC</TableCell>
              <TableCell>ID Estado</TableCell>
              <TableCell>CURP</TableCell>
              <TableCell>Estado Civil</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Teléfono Particular</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Observaciones</TableCell>
              <TableCell>Número de Tarjeta</TableCell>
              <TableCell>Errores</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData.map((apiData, index) => (
              <TableRow key={index}>
                <TableCell>{apiData.empresa}</TableCell>
                <TableCell>{apiData.nombre}</TableCell>
                <TableCell>{apiData.segundoNombre}</TableCell>
                <TableCell>{apiData.tercerNombre}</TableCell>
                <TableCell>{apiData.apellidoPaterno}</TableCell>
                <TableCell>{apiData.apellidoMaterno}</TableCell>
                <TableCell>{apiData.fechaDeNacimiento}</TableCell>
                <TableCell>{apiData.rfc}</TableCell>
                <TableCell>{apiData.idEstado}</TableCell>
                <TableCell>{apiData.curp}</TableCell>
                <TableCell>{apiData.estadoCivil}</TableCell>
                <TableCell>{apiData.telefono}</TableCell>
                <TableCell>{apiData.telefonoParticular}</TableCell>
                <TableCell>{apiData.correo}</TableCell>
                <TableCell>{apiData.observaciones}</TableCell>
                <TableCell>{apiData.cardNumber}</TableCell>
                <TableCell>
                  <ul>
                    {apiData.errorCampos.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExcelUploader;
