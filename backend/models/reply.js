const mongoose = require("mongoose");

//schéma de données : reply pr mongoDb
const replySchema = mongoose.Schema({
  userId: { type: String },
  date: { type: String },
  text: { type: String, required: true },
  imageUrl: { type: String },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
  editDate: { type: String },
  idPost: { type: String },
  userFirstName: { type: String },
  userLastName: { type: String },
});

module.exports = mongoose.model("Reply", replySchema); // 1 arg. : Reply ; 2 arg. : replySchema
