
function Editar(props) {
  // Obtener el objeto JSON de location.state
  // eslint-disable-next-line react/prop-types
  console.log(props.Nombre);
  return (
    <>
      <div>
        <h1>Pantalla de Destino</h1>
        {/* Mostrar los datos del objeto JSON */}
        {/* <p>Nombre: {datos.Nombre}</p>
        <p>Edad: {datos.Correo}</p>
        <p>Ciudad: {datos.Empresa}</p> */}
      </div>
    </>
  );
}

export default Editar;
