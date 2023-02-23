//logique métier user

const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// new user, route post
exports.signup = (req, res, next) => {
	//crypt. mp, pas de stockage du mp
	bcrypt
		.hash(req.body.password, 10)
		.then((hash) => {
			const user = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				employment: req.body.employment,
				email: req.body.email,
				password: hash,
				imageUrl: `${req.protocol}://${req.get("host")}/images/${"smile.png"}`,
			});
			user
				.save()
				.then(() =>
					res.status(201).json({
						message: "Utilisateur créé !",
						userId: user._id,
						//créa. token, pr manipulé données, par ce user spécifique
						token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
							expiresIn: "24h",
						}),
						token2: jwt.sign(
							{ userIsAdmin: user.isAdmin },
							"RANDOM_TOKEN_SECRET",
							{
								expiresIn: "24h",
							}
						),
					})
				)
				.catch((error) => res.status(400).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

//login user, route post
exports.login = (req, res, next) => {
	User.findOne({ email: req.body.email })
		.then((user) => {
			//si user n'existe pas
			if (!user) {
				return res.status(401).json({ error: "Utilisateur non trouvé !" });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					res.status(200).json({
						userId: user._id,
						//créa. token, pr manipulé données, par ce user spécifique
						token: jwt.sign(
							{ userId: user._id, userIsAdmin: user.isAdmin },
							"RANDOM_TOKEN_SECRET",
							{
								expiresIn: "24h",
							}
						),
						/*token2: jwt.sign(
              { userIsAdmin: user.isAdmin },
              "RANDOM_TOKEN_SECRET",
              {
                expiresIn: "24h",
              }
            ),*/
					});
				})
				.catch((error) => res.status(500).json({ error }));
		})
		.catch((error) => res.status(500).json({ error }));
};

//modif., route put
exports.modifyUser = (req, res, next) => {
	//modif. img
	let userObject = {};
	User.findOne({
		_id: req.params.id,
	}).then((user) => {
		if (user._id != req.auth.userId && req.auth.userIsAdmin != true) {
			res.status(401).json({ message: "Non authorisé" });
		} else {
			if (req.file) {
				//si image
				if (user.imageUrl !== "http://localhost:3001/images/smile.png") {
					fs.unlinkSync(`images/${user.imageUrl.split("/images/")[1]}`);
				}
				userObject = {
					//new  img
					imageUrl: `${req.protocol}://${req.get("host")}/images/${
						req.file.filename
					}`,
				};
			} else if (
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
					req.body.password
				)
			) {
				bcrypt.hash(req.body.password, 10).then((hash) => {
					userObject = {
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						employment: req.body.employment,
						email: req.body.email,
						password: hash,
						//imageUrl: req.body.imageUrl,
					};
				});
			} else {
				userObject = {
					...req.body,
				};
			}
			//maj user à modif., new user
			User.updateOne(
				{ _id: req.params.id },
				{ ...userObject, _id: req.params.id }
			)
				.then(() => res.status(200).json({ message: "Utilisateur modifié !" }))
				.catch((error) => res.status(400).json({ error }));
		}
	});
};

//recup. 1 user, route get
exports.getUser = (req, res, next) => {
	User.findOne({ _id: req.params.id })
		.then((user) => res.status(200).json(user))
		.catch((error) => res.status(404).json({ error }));
};
