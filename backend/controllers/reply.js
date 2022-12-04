//logique métier reply

const Reply = require("../models/reply");
const fs = require("fs");
const replyId = "";
// fonction replace

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
      usersLiked: "",
      usersDisliked: "",
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
      usersLiked: "",
      usersDisliked: "",
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
