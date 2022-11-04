var express = require("express"); //guarda express que nosotros intalamos
var bodyParser = require("body-parser"),
  port = 3000; //rmanejo de cuerpo de la "pagina" y puerto
var http = require("http"); //protocolo de intercambio de archivos
var path = require("path"); //direccion

var arbol = require("./src/rutas/RutaArbol");

var app = express(); //recibe un constructor

// todos los entornos
app.set("port", process.env.PORT || port); //metodo para recibir puerto y proceso
app.use(bodyParser.json({ type: "application/json", limit: "10mb" })); //recibe un cuerpo y un objeto json
app.use(bodyParser.urlencoded({ extended: false })); //recibe url codificada
app.use(express.static(path.join(__dirname + "./uploads")));

//================================================================
app.use(function (req, res, next) {
  // Stio web al que desea permitir que se conecte
  res.setHeader("Access-Control-Allow-Origin", "*");

  // A que métodos que desea dar permisos
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // A que  encabezados se les va a dar permiso
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  //Establezca en verdadero si necesita que el sitio web incluya cookies en las solicitudes enviadas
  //a la API (por ejemplo, en caso de que use sesiones)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pase a la siguiente capa de middleware
  next();
});

//============================================================

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const values = [username, password];

  conection.query(
    "SELECT * FROM usuarios WHERE username = ? AND password = ?",
    values,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length > 0) {
          res.status(200).send({
            id: result[0].id_usuario,
            username: result[0].username,
            password: result[0].password,
          });
        } else {
          res.status(400).send("Usuario no existe");
        }
      }
    }
  );
});

app.use("/dashboard", arbol());

http.createServer(app).listen(app.get("port"), function () {
  console.log("Servidor Express escuchando por el puerto " + app.get("port"));
});

module.exports = app;
