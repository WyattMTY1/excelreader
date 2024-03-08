
import "./App.css";


import { Route, Routes } from "react-router-dom";
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
      <Route path="/respuesta" element={<Respuesta />} />
    </Routes>
  );
}

export default App;
