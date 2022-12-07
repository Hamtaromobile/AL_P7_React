// routes reply

const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const replyCtrl = require("../controllers/reply");

//protect. d'authentification
const auth = require("../middleware/auth");

//création
router.post("/createReply", auth, multer, replyCtrl.createReply);

//lecture
router.get("/getAllReply", auth, replyCtrl.getAllReply);

//recup. un post
router.get("/getOneReply/:id", auth, replyCtrl.getOneReply);

//modif.
router.put("/modifyReply/:id", auth, multer, replyCtrl.modifyReply);

//supp.
router.delete("/deleteReply/:id", auth, replyCtrl.deleteReply);

//like, dislike
router.post("/likeDislikeReply/:id", auth, replyCtrl.likeDislikeReply);

module.exports = router;
