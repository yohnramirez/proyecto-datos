//cargamos las libreras
const connection = require("../conexion")
const express = require("express");
const router = express.Router();
const multer = require("multer");
const moment = require("moment")
const ModeloArbol = require("../modelo/ModeloArbol");

module.exports = function () {

  var imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
      callback(null, `image-${Date.now()}.${file.originalname}`);
    },
  });
  
  const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
      callback(null, true);
    } else {
      callback(null, Error("only image is allowd"));
    }
  };
  
  var upload = multer({
    storage: imgconfig,
    fileFilter: isImage,
  });

  router.get("/", function (req, res) {
    ModeloArbol.getArbol(function (error, data) {
      res.status(200).json(data);
    });
  });

  router.get("/:id", function (req, res) {
    var id = req.params.id;

    if (!isNaN(id)) {
      ModeloArbol.getArbolById(id, function (err, data) {
        if (typeof data !== "undefined" && data.length > 0) {
          res.status(200).json(data);
        } else {
          res.status(404, {
            msg: "Registro no existe",
          });
        }
      });
    } else {
      res.status(500).json({ msg: "error" });
    }
  });

  router.post("/", upload.single("imagen"), function (req, res) {
    const arbolData = {
      id_arbol: null,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      imagen: req.body.imagen,
      ubicacion: req.body.ubicacion,
      date: moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
    };

    ModeloArbol.insertArbol(arbolData, function (error, data) {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });

  router.put("/", function (req, res) {
    var arbolData = {
      id_arbol: req.body.id_arbol,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      imagen: req.body.imagen,
      ubicacion: req.body.ubicacion,
    };

    ModeloArbol.updateArbol(arbolData, function (error, data) {
      if (data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({
          error: "boo:(",
        });
      }
    });
  });

  return router;
};
