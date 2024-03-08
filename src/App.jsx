
import "./App.css";


import { Route, Routes } from "react-router-dom";
import ExcelUploader from "./assets/views/envioDatos";



function App() {

  return (
    <Routes>
      <Route exact path="/" element={<ExcelUploader />} />

    </Routes>
  );
}

export default App;
