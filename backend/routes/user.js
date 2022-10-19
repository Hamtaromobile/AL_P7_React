//route user

const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const multer = require("../middleware/multer-config");
//protect. d'authentification
const auth = require("../middleware/auth");

//signup
router.post("/signup", userCtrl.signup);

//login
router.post("/login", userCtrl.login);

//Modify
router.put("/modifyUser/:id", multer, userCtrl.modifyUser);

//recup. user
router.get("/getUser/:id", userCtrl.getUser);

module.exports = router;
