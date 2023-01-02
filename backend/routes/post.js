// routes post

const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const postCtrl = require("../controllers/post");

//protect. d'authentification
const auth = require("../middleware/auth");

//création
router.post("/createPost", auth, multer, postCtrl.createPost);

//lecture
router.get("/getAllPost", postCtrl.getAllPost);

//recup. un post
router.get("/getOnePost/:id", postCtrl.getOnePost);

//modif.
router.put("/modifyPost/:id", auth, multer, postCtrl.modifyPost);

//supp.
router.delete("/deletePost/:id", auth, postCtrl.deletePost);

//like, dislike
router.post("/likeDislikePost/:id", auth, postCtrl.likeDislikePost);

//Id reply
//router.post("/idReply/:id", auth, postCtrl.idReply);

//Number views
router.post("/views/:id", postCtrl.views);

//Number replies
router.post("/replies/:id", postCtrl.replies);

module.exports = router;
