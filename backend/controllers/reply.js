//logique métier reply

const Reply = require("../models/reply");
const fs = require("fs");

//creation, route reply
exports.createReply = (req, res, next) => {
	//const replyObject = JSON.parse(req.body.reply); // "form-data" parse en JSON
	const replyObject = req.body;
	delete replyObject._id; //remove id de la req, remplacer par l'id de mongoDb
	delete replyObject._userId; //remove _userId, protection contre mauvais id envoyé
	if (req.file) {
		//req.file existe ?
		const newReply = new Reply({
			//créa new instance
			...replyObject, //copy champ de req.body
			userId: req.auth.userId,
			imageUrl: `${req.protocol}://${req.get("host")}/images/${
				req.file.filename
			}`,
			likes: 0,
			dislikes: 0,
			editDate: "",
		});
		newReply
			.save()
			.then(() =>
				res
					.status(201)
					.json({ message: "reply enregistré!", replyId: newReply._id })
			)
			.catch((error) => res.status(400).json({ error }));
	} else {
		const newReply = new Reply({
			//créa new instance
			...replyObject, //copy champ de req.body
			userId: req.auth.userId,
			imageUrl: "",
			likes: 0,
			dislikes: 0,
			editDate: "",
		});
		newReply
			.save()
			.then(() =>
				res
					.status(201)
					.json({ message: "reply enregistré!", replyId: newReply._id })
			)
			.catch((error) => res.status(400).json({ error }));
	}
};

//recup. All reply, route get
exports.getReplies = (req, res, next) => {
	Reply.find()
		.then((reply) => res.status(200).json(reply))
		.catch((error) => res.status(404).json({ error }));
};

//recup replies lié au post principal
exports.getRepliesMainpost = (req, res, next) => {
	Reply.find({ idPost: req.params.id })
		.then((reply) => res.status(200).json(reply))
		.catch((error) => res.status(400).json({ error }));
};

//modif., route put
exports.modifyReply = (req, res, next) => {
	//modif. img
	let replyObject = {};
	Reply.findOne({ _id: req.params.id }) //
		.then((reply) => {
			//si user n'est pas le créateur
			if (reply.userId != req.auth.userId && req.auth.userIsAdmin != true) {
				res.status(401).json({ message: "Non authorisé" });
			} else {
				req.file // req.file existe ?
					? //si oui
					  (Reply.findOne({
							_id: req.params.id,
					  }).then((reply) => {
							reply.imageUrl //existe ?
								? fs.unlinkSync(`images/${reply.imageUrl.split("/images/")[1]}`) //supp. img
								: "";
					  }),
					  (replyObject = {
							...req.body,
							imageUrl: `${req.protocol}://${req.get("host")}/images/${
								req.file.filename
							}`,
					  }))
					: (replyObject = { ...req.body }); //si non
				//maj reply à modif., new reply
				Reply.updateOne(
					{ _id: req.params.id },
					{ ...replyObject, _id: req.params.id }
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
exports.deleteReply = (req, res, next) => {
	Reply.findOne({ _id: req.params.id })
		.then((reply) => {
			//si user n'est pas le créateur
			if (reply.userId != req.auth.userId && req.auth.userIsAdmin != true) {
				res.status(401).json({ message: "Non authorisé" });
			} else {
				//delete img
				const filename = reply.imageUrl.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {
					//callback, delete reply
					Reply.deleteOne({ _id: req.params.id })
						.then(() => {
							res.status(200).json({ message: "reply supprimé !" });
						})
						.catch((error) => res.status(401).json({ error }));
				});
			}
		})
		.catch((error) => {
			res.status(500).json({ error });
		});
};

//like, dislike route reply
exports.likeDislikeReply = (req, res, next) => {
	//like
	if (req.body.like === 1) {
		Reply.updateOne(
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
		Reply.updateOne(
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
		Reply.findOne({ _id: req.params.id })
			.then((reply) => {
				//annuler like
				if (reply.usersLiked.includes(req.body.userId)) {
					Reply.updateOne(
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
				if (reply.usersDisliked.includes(req.body.userId)) {
					Reply.updateOne(
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
