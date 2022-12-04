//logique métier post

const Post = require("../models/post");
const fs = require("fs");
const postId = "";
// fonction replace

//creation, route post
exports.createPost = (req, res, next) => {
  //const postObject = JSON.parse(req.body.post); // "form-data" parse en JSON
  const postObject = req.body;

  delete postObject._id; //remove id de la req, remplacer par l'id de mongoDb
  delete postObject._userId; //remove _userId, protection contre mauvais id envoyé

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
      usersLiked: "",
      usersDisliked: "",
      editDate: "",
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
      usersLiked: "",
      usersDisliked: "",
      editDate: "",
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
  Post.find()
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

//modif., route put
exports.modifyPost = (req, res, next) => {
  //modif. img
  const postObject = req.file // req.file existe ?
    ? {
        //si oui
        // ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }; //si non
  //maj post à modif., new post
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

//delete, route delete
exports.deletePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }) //
    .then((post) => {
      //si user n'est pas le créateur
      if (post.userId != req.auth.userId) {
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
exports.likeDislike = (req, res, next) => {
  console.log("req.body.like:", req.body.like);
  console.log("req.body.:", req.body);
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
