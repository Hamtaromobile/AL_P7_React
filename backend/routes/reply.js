// routes reply

const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer-config");
const replyCtrl = require("../controllers/reply");

//protect. d'authentification
const auth = require("../middleware/auth");

//création
router.post("/createReply", auth, multer, replyCtrl.createReply);

//recup. replies's mainpost
router.get("/getRepliesMainpost/:id", auth, replyCtrl.getRepliesMainpost);

//recup. replies
router.get("/getReplies", auth, replyCtrl.getReplies);

//modif.
router.put("/modifyReply/:id", auth, multer, replyCtrl.modifyReply);

//supp.
router.delete("/deleteReply/:id", auth, replyCtrl.deleteReply);

//like, dislike
router.post("/likeDislikeReply/:id", auth, replyCtrl.likeDislikeReply);

module.exports = router;
