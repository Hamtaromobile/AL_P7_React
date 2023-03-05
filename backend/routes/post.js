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
router.get("/getAllPost", auth, postCtrl.getAllPost);

//recup. un post
router.get("/getOnePost/:id", auth, postCtrl.getOnePost);

//modif.
router.put("/modifyPost/:id", auth, multer, postCtrl.modifyPost);

//supp.
router.delete("/deletePost/:id", auth, postCtrl.deletePost);

//like, dislike
router.post("/likeDislikePost/:id", auth, postCtrl.likeDislikePost);

//Number views
router.post("/views/:id", postCtrl.views);

//Tab. push idReplies
router.post("/pushIdReply/:id", auth, postCtrl.pushIdReply);

//Tab. pull idReplies
router.post("/pullIdReply/:id", auth, postCtrl.pullIdReply);

module.exports = router;
