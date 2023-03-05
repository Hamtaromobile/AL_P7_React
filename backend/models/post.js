const mongoose = require("mongoose");

//schéma de données : post pr mongoDb
const postSchema = mongoose.Schema({
	userId: { type: String },
	date: { type: String },
	title: { type: String, required: true },
	text: { type: String, required: true },
	imageUrl: { type: String },
	likes: { type: Number },
	dislikes: { type: Number },
	usersLiked: { type: [String] },
	usersDisliked: { type: [String] },
	editDate: { type: String },
	idReplies: { type: [String] },
	views: { type: Number },
	userPicture: { type: String },
	userFirstName: { type: String },
	userLastName: { type: String },
});

module.exports = mongoose.model("Post", postSchema); // 1 arg. : Post ; 2 arg. : postSchema
