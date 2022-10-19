//logique métier user

const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// new user, route post
exports.signup = (req, res, next) => {
  //crypt. mp, pas de stockage du mp
  console.log(req.body);
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        employment: req.body.employment,
        email: req.body.email,
        password: hash,
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
      //user n'existe pas
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
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//modif., route put
exports.modifyUser = (req, res, next) => {
  //modif. img
  console.log("req.body.user,", req.body.user);
  console.log("req.File", req.file);
  /*console.log("req.recfile", req.recfile);
  console.log("req.body", req.body);
  console.log("req.protocol", req.protocol);
  console.log("req.params.id", req.params.id);*/
  const userObject = req.file // req.file existe ?
    ? {
        //si oui
        //...JSON.parse(req.body.user),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }; //si non
  //maj user à modif., new user
  User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Utilisateur modifié !", res }))
    .catch((error) => res.status(400).json({ error }));
};

//recup. 1 user, route get
exports.getUser = (req, res, next) => {
  console.log("req", req);
  console.log("req.params.id", req.params.id);
  User.findOne({ _id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};
