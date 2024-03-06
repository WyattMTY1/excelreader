// import { useState } from "react";
import "../../App.css";
import * as XLSX from "xlsx";
// import { faPencil } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Link } from "react-router-dom";

function Validacion() {
//   const [data, setData] = useState([]);
  const EMPRESA_REGEX = /^[A-Z]+$/;
  const NOMBRE_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\\s\\']+$/;
  const FECHA_NACIMIENTO_REGEX =
    /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\\d{4})$/;
  const RFC_REGEX = /^[A-ZÑ&]{3,4}\\d{6}[A-V1-9][A-Z1-9]\\d$/;
  const ID_ESTADO_REGEX = /^\\d{1,32}$/;
  const CURP_REGEX = /^[A-Z]{4}\\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/;
  const ESTADO_CIVIL_REGEX = /^(S|CS|CM|CC|V|D|U)$/;
  const TELEFONO_REGEX = /^\\d{8}$/;
  const TELEFONO_PARTICULAR_REGEX = /^\\d{10}$/;
  const CORREO_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;
  const OBSERVACIONES_REGEX = "";
  const CARD_NUMBER_REGEX = /^\\d{16}$/;

//   const fileUpdate = (e) => {
//     const reader = new FileReader();
//     reader.readAsBinaryString(e.target.files[0]);
//     reader.onload = (e) => {
//       const data = e.target.result;
//       const workbook = XLSX.read(data, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const paserdData = XLSX.utils.sheet_to_json(sheet);
//       setData(paserdData);
//       console.log(paserdData);
//     };
//   };

  // Función para validar todas las columnas con regex
  const validarTodasLasColumnasRegex = (archivo, expresionesRegulares) => {
    const lector = new FileReader();

    return new Promise((resolve, reject) => {
      lector.onload = (e) => {
        try {
          // Obtén el contenido del archivo
          const contenidoArchivo = e.target.result;

          // Convierte el contenido del archivo a un objeto de trabajo de Excel
          const libroDeTrabajo = XLSX.read(contenidoArchivo, {
            type: "binary",
          });

          // Obtiene la primera hoja de trabajo
          const primeraHoja = libroDeTrabajo.SheetNames[0];

          // Obtiene los datos de la hoja de trabajo
          const datos = XLSX.utils.sheet_to_json(
            libroDeTrabajo.Sheets[primeraHoja]
          );

          // Realiza la validación para cada columna
          const columnasInvalidas = [];

          // Itera sobre las expresiones regulares
          expresionesRegulares.forEach((regex, nombreColumna) => {
            // Obtiene los valores de la columna específica
            const valoresColumna = datos.map((fila) => fila[nombreColumna]);

            // Verifica si todos los valores de la columna cumplen con la expresión regular
            const esValida = valoresColumna.every((valor) => regex.test(valor));

            // Si no es válida, agrega el nombre de la columna a la lista de columnas inválidas
            if (!esValida) {
              columnasInvalidas.push(nombreColumna);
            }
          });

          // Resuelve la promesa con el resultado de la validación
          if (columnasInvalidas.length === 0) {
            resolve({ valido: true });
          } else {
            resolve({ valido: false, columnasInvalidas });
          }
        } catch (error) {
          // Rechaza la promesa si hay algún error
          reject({
            valido: false,
            mensaje: "Error al validar las columnas con regex.",
          });
        }
      };

      // Lee el archivo como binario
      lector.readAsBinaryString(archivo);
    });
  };
  const manejarCambioArchivo = async (event) => {
    const archivo = event.target.files[0];

    if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["empresa",EMPRESA_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
    if (archivo) {
      try {
        // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
        const expresionesRegulares = new Map([
          ["nombre", NOMBRE_REGEX],
          // Agrega más expresiones regulares según las columnas que necesites validar
        ]);

        // Validar todas las columnas con regex
        const resultadoValidacion = await validarTodasLasColumnasRegex(
          archivo,
          expresionesRegulares
        );

        if (resultadoValidacion.valido) {
          console.log(
            "Todas las columnas cumplen con las expresiones regulares."
          );
        } else {
          console.error(
            "Columnas con errores:",
            resultadoValidacion.columnasInvalidas
          );
        }
      } catch (error) {
        console.error("Error al procesar el archivo Excel:", error);
      }
    }
    if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["segundoNombre", NOMBRE_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
      if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["tercer Nombre", NOMBRE_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
      if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["apellidoPaterno", NOMBRE_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
      if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["apellidoMaterno", NOMBRE_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
    if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["fechaDeNacimiento", FECHA_NACIMIENTO_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
      if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["rfc", RFC_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
      if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["idEstado", ID_ESTADO_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
      if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["curp", CURP_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
      if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["estadoCivil", ESTADO_CIVIL_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
      if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["telefono", TELEFONO_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
      if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["telefonoParticular", TELEFONO_PARTICULAR_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
      if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["correo", CORREO_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
      if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["observaciones", OBSERVACIONES_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
      if (archivo) {
        try {
          // Expresiones regulares para validar cada columna (por ejemplo, solo letras para "Nombre")
          const expresionesRegulares = new Map([
            ["cardNumber", CARD_NUMBER_REGEX],
            // Agrega más expresiones regulares según las columnas que necesites validar
          ]);
  
          // Validar todas las columnas con regex
          const resultadoValidacion = await validarTodasLasColumnasRegex(
            archivo,
            expresionesRegulares
          );
  
          if (resultadoValidacion.valido) {
            console.log(
              "Todas las columnas cumplen con las expresiones regulares."
            );
          } else {
            console.error(
              "Columnas con errores:",
              resultadoValidacion.columnasInvalidas
            );
          }
        } catch (error) {
          console.error("Error al procesar el archivo Excel:", error);
        }
      }
  };
  return (
    <>
      <div className="cuerpo">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={manejarCambioArchivo}
        />
        {/* {data.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                  <td>
                    <Link to="">
                      <button
                        onClick={() => {
                          console.log(row);
                        }}
                      >
                        <FontAwesomeIcon icon={faPencil} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )} */}
      </div>
    </>
  );
}
export default Validacion;
