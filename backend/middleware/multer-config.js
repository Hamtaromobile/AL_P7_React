//téléchargement fichiers, images

const multer = require("multer");

//créat. dictionnaire
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//objet de config. pr multer
const storage = multer.diskStorage({
  //enreg. sur disk
  //enreg. ds "images"
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  //chgt nom fichier img
  filename: (req, file, callback) => {
    let name = file.originalname.split(" ").join("_");
    let extension = MIME_TYPES[file.mimetype];
    name = name.replace("." + extension, "_");
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
