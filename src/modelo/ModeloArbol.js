// cargamos la conexion
var connection = require("../conexion");

//Creamos un objeto para almacenar lo que necesitamos
var ModeloArbol = {};

//----------------------------------------------------------------
//Funcion para listar los tipos de documentos
//obtenemos todos los tipos de documentos
ModeloArbol.getArbol = function (callback) {
  // se calida la conexion
  if (connection) {
    // se hace la instruccion SQL para la BD
    var sql = `SELECT * FROM arboles`;
    // se usa la conexion para evitar la instruccion SQL
    connection.query(sql, function (error, row) {
      // se valida si hay error
      if (error) {
        throw error;
      } else {
        // devuelve las filas como un Json
        callback(null, row);
        // convierte las filas Json a una cadena de texto para angular
        // callback(null, JSON.stringify(rows));
      }
    });
  }
};
//----------------------------------------------------------------
//obtenemos un tipo doc por su id
ModeloArbol.getArbolById = function (id, callback) {
  // se valida la conexion
  if (connection) {
    // se hace la instruccion SQL para la BD
    var sql =
      "SELECT * FROM arboles WHERE id_arbol=" + connection.escape(id) + ";";

    // se usa la conexion para enviar la instruccion SQL
    connection.query(sql, function (error, row) {
      // se valida si hay error
      if (error) {
        throw error;
      } else {
        //devuelve la fila como un Json
        callback(null, row);
        // convierte la fila Json a una cadena de texto para Angular
        // callback(null,JSON.stringify(row));
      }
    });
  }
};

//-----------------------------------
//Añadir un nuevo tipo de documento
ModeloArbol.insertArbol = function (arbolData, callback) {
  //Se valida la conexión
  if (connection) {
    //Se hace la instruccion SQL para crear registros de modo dinamico a la BD
    var sql = "INSERT INTO arboles SET?";

    //Se usa la conexion para enviar la instruccion SQL
    connection.query(sql, arbolData, function (error, result) {
      // se valida si hay error
      if (error) {
        throw error;
      } else {
        //mensaje de exito
        callback(null, { msg: "Registro Insertado" });
      }
    });
  }
};
//------------------------------------------------------------------------------
// actualizar un tipo de documento
ModeloArbol.updateArbol = function (arbolData, callback) {
  //console.log ("32 tal");
  if (connection) {
    var sql = `UPDATE arboles SET nombre = ${connection.escape(
      arbolData.nombre
    )}, descripcion = ${connection.escape(
      arbolData.descripcion
    )}, imagen = ${connection.escape(
      arbolData.imagen
    )}, ubicacion = ${connection.escape(
      arbolData.ubicacion
    )} WHERE id_arbol = ${connection.escape(arbolData.id_arbol)};`;

    connection.query(sql, function (error, result) {
      // se muestra el mensaje correspondiente
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro Actualizado" });
      }
    });
  }
};
//------------------------------------------------------------------
// exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = ModeloArbol;
