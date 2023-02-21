//logique métier post
const Reply = require("../models/reply");
const Post = require("../models/post");
const fs = require("fs");
// fonction replace

//creation, route post
exports.createPost = (req, res, next) => {
	const postObject = req.body;
	delete postObject._id; //remove id de la req, remplacer par l'id de mongoDb
	delete postObject._userId; //remove _userId, protection contre mauvais id envoyé
	console.log("Post req.file", req.file);

	if (req.file) {
		//req.file existe ?
		const newPost = new Post({
			//créa new instance
			...postObject, //copy champ de req.body
			userId: req.auth.userId,
			imageUrl: `${req.protocol}://${req.get("host")}/images/${
				req.file.filename
			}`,
			likes: 0,
			dislikes: 0,
			editDate: "",
			replies: 0,
			views: 0,
		});
		newPost
			.save()
			.then(() =>
				res
					.status(201)
					.json({ message: "post enregistré!", postId: newPost._id })
			)
			.catch((error) => res.status(400).json({ error }));
	} else {
		const newPost = new Post({
			//créa new instance
			...postObject, //copy champ de req.body
			userId: req.auth.userId,
			imageUrl: "",
			likes: 0,
			dislikes: 0,
			editDate: "",
			replies: 0,
			views: 0,
		});
		newPost
			.save()
			.then(() =>
				res
					.status(201)
					.json({ message: "post enregistré!", postId: newPost._id })
			)
			.catch((error) => res.status(400).json({ error }));
	}
};

//recup. 1 post, route get
exports.getOnePost = (req, res, next) => {
	Post.findOne({ _id: req.params.id })
		.then((post) => res.status(200).json(post))
		.catch((error) => res.status(404).json({ error }));
};

//recup. tous les posts, route get
exports.getAllPost = (req, res, next) => {
	/* console.log("req.params",req.params);
  if (post.userId === req.auth.userId && req.auth.userIsAdmin === true) {*/
	Post.find()
		.then((posts) => res.status(200).json(posts))
		.catch((error) => res.status(400).json({ error }));
};

//Add idReply
exports.pushIdReply = (req, res, next) => {
	if (req.body.idReply) {
		Post.updateOne(
			{ _id: req.params.id },
			{
				$push: { idReplies: req.body.idReply },
			}
		)
			.then(() => res.status(200).json({ message: "push idReply ok" }))
			.catch((error) => res.status(400).json({ error }));
	}
};

//remove idReply
exports.pullIdReply = (req, res, next) => {
	console.log("req.body.idReply", req.body.idReply);
	if (req.body.idReply) {
		Post.updateOne(
			{ _id: req.params.id },
			{
				$pull: { idReplies: req.body.idReply },
			}
		)
			.then(() => res.status(200).json({ message: "push idReply ok" }))
			.catch((error) => res.status(400).json({ error }));
	}
};

//modif., route put
exports.modifyPost = (req, res, next) => {
	//modif. img
	let postObject = {};
	Post.findOne({ _id: req.params.id }) //
		.then((post) => {
			//si user n'est pas le créateur
			if (post.userId != req.auth.userId && req.auth.userIsAdmin != true) {
				res.status(401).json({ message: "Non authorisé" });
			} else {
				req.file // req.file existe ?
					? //si oui
					  (Post.findOne({
							_id: req.params.id,
					  }).then((post) => {
							post.imageUrl //existe ?
								? fs.unlinkSync(`images/${post.imageUrl.split("/images/")[1]}`) //supp. img
								: "";
					  }),
					  (postObject = {
							...req.body,
							imageUrl: `${req.protocol}://${req.get("host")}/images/${
								req.file.filename
							}`,
					  }))
					: (postObject = { ...req.body }); //si non
				//maj post à modif., new post
				Post.updateOne(
					{ _id: req.params.id },
					{ ...postObject, _id: req.params.id }
				)
					.then(() => res.status(200).json({ message: "Objet modifié !" }))
					.catch((error) => res.status(400).json({ error }));
			}
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};

//delete, route delete
exports.deletePost = (req, res, next) => {
	Post.findOne({ _id: req.params.id })
		.then((post) => {
			//si user n'est pas le créateur
			if (post.userId != req.auth.userId && req.auth.userIsAdmin != true) {
				res.status(401).json({ message: "Non authorisé" });
			} else {
				//delete img
				const filename = post.imageUrl.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {
					//callback, delete post
					Post.deleteOne({ _id: req.params.id })
						.then(() => {
							res.status(200).json({ message: "post supprimé !" });
						})
						.catch((error) => res.status(401).json({ error }));
				});
			}
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};

//like, dislike route post
exports.likeDislikePost = (req, res, next) => {
	//like
	if (req.body.like === 1) {
		Post.updateOne(
			{ _id: req.params.id },
			{
				$push: { usersLiked: req.body.userId },
				$inc: { likes: +1 },
			}
		)
			.then(() => res.status(200).json({ message: "like" }))
			.catch((error) => res.status(400).json({ error }));
	}
	//dislike
	if (req.body.like === -1) {
		Post.updateOne(
			{ _id: req.params.id },
			{
				$push: { usersDisliked: req.body.userId },
				$inc: { dislikes: +1 },
			}
		)
			.then(() => res.status(200).json({ message: "Dislike" }))
			.catch((error) => res.status(400).json({ error }));
	}
	//annuler like, dislike
	if (req.body.like === 0) {
		Post.findOne({ _id: req.params.id })
			.then((post) => {
				//annuler like
				if (post.usersLiked.includes(req.body.userId)) {
					Post.updateOne(
						{ _id: req.params.id },
						{
							$pull: { usersLiked: req.body.userId },
							$inc: { likes: -1 },
						}
					)
						.then(() => res.status(200).json({ message: "remove Like" }))
						.catch((error) => res.status(400).json({ error }));
				}
				//annuler dislike
				if (post.usersDisliked.includes(req.body.userId)) {
					Post.updateOne(
						{ _id: req.params.id },
						{
							$pull: { usersDisliked: req.body.userId },
							$inc: { dislikes: -1 },
						}
					)
						.then(() => res.status(200).json({ message: "remove Dislike" }))
						.catch((error) => res.status(400).json({ error }));
				}
			})
			.catch((error) => res.status(404).json({ error }));
	}
};

//nbr views main post
exports.views = (req, res, next) => {
	Post.updateOne(
		{ _id: req.params.id },
		{
			$inc: { views: +0.25 },
		}
	)
		.then(() => res.status(200).json({ message: "views +1 ok" }))
		.catch((error) => res.status(400).json({ error }));
};

//nbr replies main post
exports.NbrReplies = (req, res, next) => {
	Post.updateOne(
		{ _id: req.params.id },
		{
			$inc: { replies: +1 },
		}
	)
		.then(() => res.status(200).json({ message: "post +1 ok" }))
		.catch((error) => res.status(400).json({ error }));
};
