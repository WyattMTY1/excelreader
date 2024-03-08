
import "./App.css";


import { Route, Routes } from "react-router-dom";
import LecturadeDatos from "./assets/views/lectura";
import Prueba from "./assets/views/prueba";
// import Editar from "./assets/views/editar";
import Validacion from "./assets/views/validacion";
import Pruebas from "./assets/views/pruebas2";
import Editar1 from "./assets/views/envioDatos";
import ExcelReader from "./assets/views/prueba3";
import ExcelUploader from "./assets/views/envioDatos";


function App() {

  return (
    <Routes>
      <Route exact path="/" element={<Validacion />} />
      <Route path="/lectura" element={<LecturadeDatos />} />
      <Route path="/prueba" element={<Prueba />} />
      <Route path="/pruebas" element={<Pruebas />} />
      <Route path="/prueba1" element={<ExcelUploader />} />
      <Route path="/editar" element={<Editar1 />} />
    </Routes>
  );
}

export default App;
