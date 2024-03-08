import { useState } from "react";
import * as XLSX from "xlsx";

const Prueba = () => {
  const [tableData, setTableData] = useState([]);
  const [rowSelect, setRowSelect] = useState([]);
  const EMPRESA_REGEX = /^[A-Z]+$/;
  const NOMBRE_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\\s\\']+$/;
  const MAS_NOMBRES_REGEX = /^[A-Za-z\s]*$/;
  const FECHA_NACIMIENTO_REGEX =
    /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\\d{4})$/;
  const RFC_REGEX = /^[A-ZÑ&]{3,4}\\d{6}[A-V1-9][A-Z1-9]\\d$/;
  const ID_ESTADO_REGEX = /^\\d{1,32}$/;
  const CURP_REGEX = /^[A-Z]{4}\\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/;
  const ESTADO_CIVIL_REGEX = /^(S|CS|CM|CC|V|D|U)$/;
  const TELEFONO_REGEX = /^\\d{8}$/;
  const TELEFONO_PARTICULAR_REGEX = /^\\d{10}$/;
  const CORREO_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
  const OBSERVACIONES_REGEX = /^[A-Za-z\s]*$/;
  const CARD_NUMBER_REGEX = /^\\d{16}$/;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
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
        if (rowIndex === 0) {
          // Titulos
          return <th key={colIndex}>{cell}</th>;
        }

        let isValid = true;
        let regexToUse = null;
        // Elegir el regex según la columna
        if (colIndex === 0) {
          regexToUse = EMPRESA_REGEX;
        } else if (colIndex === 1) {
          regexToUse = NOMBRE_REGEX;
        } else if (colIndex === 2) {
          //SEGUNDO NOMBRE
          regexToUse = MAS_NOMBRES_REGEX;
        } else if (colIndex === 3) {
          //TERCER NOMBRE
          regexToUse = MAS_NOMBRES_REGEX;
        } else if (colIndex === 4) {
          //APELLIDO PATERNO
          regexToUse = NOMBRE_REGEX;
        } else if (colIndex === 5) {
          //APELLIDO MATERNO
          regexToUse = NOMBRE_REGEX;
        } else if (colIndex === 6) {
          //FECHA
          regexToUse = FECHA_NACIMIENTO_REGEX;
        } else if (colIndex === 7) {
          //RFC
          regexToUse = RFC_REGEX;
        } else if (colIndex === 8) {
          //IDESTADO
          regexToUse = ID_ESTADO_REGEX;
        } else if (colIndex === 9) {
          //CURP
          regexToUse = CURP_REGEX;
        } else if (colIndex === 10) {
          //ESTADOCIVIL
          regexToUse = ESTADO_CIVIL_REGEX;
        } else if (colIndex === 11) {
          //TELEFONO
          regexToUse = TELEFONO_REGEX;
        } else if (colIndex === 12) {
          //TELEFONOPARTICULAR
          regexToUse = TELEFONO_PARTICULAR_REGEX;
        } else if (colIndex === 13) {
          //CORREO
          regexToUse = CORREO_REGEX;
        } else if (colIndex === 14) {
          //OBSERVACIONES
          regexToUse = OBSERVACIONES_REGEX;
        } else if (colIndex === 15) {
          //CARDNUMBER
          regexToUse = CARD_NUMBER_REGEX;
        }
        // Validar la celda con el regex correspondiente
        if (regexToUse) {
          isValid = regexToUse.test(cell);
        }
        const cellStyle = {
          color: isValid ? "white" : "red",
        };
        return (
          <td key={colIndex} style={cellStyle}>
            {cell}
          </td>
        );
        
        
      });
      if (rowIndex === 0) {
        // Titulos
          rowData.push(
            <th key="edit">
              acciones
            </th>
          )

      }else{
          // Agregar la columna
          rowData.push(
            <td key="edit">
              <button onClick={() => {
                console.log(row);
                setRowSelect(row);
              }}>Editar</button>
            </td>
          )
      }

      return <tr key={rowIndex}>{rowData}</tr>;
    });

    setTableData(processedData);
  };

  {console.log(rowSelect)}
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <h2>Excel Data:</h2>
      <table border="1">
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
};

export default Prueba;
