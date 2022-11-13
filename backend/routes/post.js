// routes post

const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/post");

//protect. d'authentification
const auth = require("../middleware/auth");

//création
router.post("/createPost", auth, multer, postCtrl.createPost); //auth

//lecture
router.get("/getAllPost", auth, postCtrl.getAllPost);

//recup. un post
router.get("/:id", auth, postCtrl.getOnePost);

//modif.
router.put("/:id", auth, multer, postCtrl.modifyPost);

//supp.
router.delete("/:id", auth, postCtrl.deletePost);

//like, dislike
router.post("/:id/like", auth, postCtrl.likeDislike);

module.exports = router;
