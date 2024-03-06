import { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";


function App() {
  const [data, setData] = useState([]);

  const fileUpdate = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const paserdData = XLSX.utils.sheet_to_json(sheet);
      setData(paserdData);
    };
  };

  return (
    <>
      <div className="cuerpo">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={fileUpdate}
        />
        {data.length > 0 &&(
          <table className="table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>                   
                  ))}
                  <td>
                    <button></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default App;