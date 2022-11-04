const path = require("path");
const multer = require("multer");

const imgStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname + "../upload"));
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});

module.exports = imgStorage