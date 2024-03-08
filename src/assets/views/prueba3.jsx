import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

const ExcelReader = () => {
  const [tableData, setTableData] = useState([]);
  const [correctData, setCorrectData] = useState([]);
  const [incorrectData, setIncorrectData] = useState([]);
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    separateData(tableData);
  }, [tableData]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      processExcelData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const processExcelData = (data) => {
    const processedData = data.map((row, rowIndex) => {
      const rowData = row.map((cell, colIndex) => {
        const cellValue = cell !== null && cell !== undefined ? cell : 'N/A';

        return <td key={colIndex}>{cellValue}</td>;
      });

      return <tr key={rowIndex}>{rowData}</tr>;
    });

    setTableData(processedData);
  };

  const separateData = (data) => {
    const correct = [];
    const incorrect = [];

    data.forEach((row, rowIndex) => {
      const isValid = row.props.children.every((cell) => cell.props.children !== 'N/A');

      if (isValid) {
        correct.push(row);
      } else {
        incorrect.push(row);
      }
    });

    setCorrectData(correct);
    setIncorrectData(incorrect);
  };

  const handleCorrection = () => {
    // Implementa la lógica para corregir campos incorrectos
    console.log('Corregir campos incorrectos');
  };

  const sendJsonData = () => {
    if (correctData.length > 0) {
      const jsonTable = {};
      const titles = correctData[0].props.children.map((cell) => cell.props.children);

      correctData.forEach((row) => {
        const rowData = row.props.children.map((cell, colIndex) => {
          const title = titles[colIndex];
          jsonTable[title] = cell.props.children;
          return null;
        });
      });

      setJsonData(jsonTable);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <h2>Excel Data:</h2>
      <table border="1">
        <tbody>{tableData}</tbody>
      </table>
      <h3>Correct Data:</h3>
      <table border="1">
        <tbody>{correctData}</tbody>
      </table>
      <h3>Incorrect Data:</h3>
      <table border="1">
        <tbody>{incorrectData}</tbody>
      </table>
      <button onClick={handleCorrection}>Corregir Campos Incorrectos</button>
      <button onClick={sendJsonData}>Enviar JSON</button>
    </div>
  );
};

export default ExcelReader;