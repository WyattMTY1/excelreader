
import "./App.css";


import { Route, Routes } from "react-router-dom";
import LecturadeDatos from "./assets/views/lectura";
import Editar from "./assets/views/editar";
import Validacion from "./assets/views/validacion";


function App() {

  return (
    <Routes>
      <Route exact path="/" element={<LecturadeDatos />} />
      <Route path="/editar" element={<Editar />} />
      <Route path="/validacion" element={<Validacion />} />
    </Routes>
  );
}

export default App;
