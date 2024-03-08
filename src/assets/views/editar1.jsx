function Editar1(props) {
  // Paso 8: El componente hijo recibe el prop y lo utiliza
  return (
    <div>
      <h2>Componente Hijo</h2>
      <p>Datos recibidos en el componente hijo: {props.row.nombre}</p>
    </div>
  );
}

export default Editar1;
