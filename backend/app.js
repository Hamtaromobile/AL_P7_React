//framework express
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
//sécurise req http, en-tête, etc..
const helmet = require("helmet");

//import route post
const postRoutes = require("./routes/post");

// import route user
const userRoutes = require("./routes/user");

// import route reply
const replyRoutes = require("./routes/reply");

const cors = require("cors");

//permet la connexion à mongodb
mongoose
  .connect(
    "mongodb+srv://antoine:antoine@cluster0.nss6wxt.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//création application express
const app = express();

//intercept req. json mis ds body.req
app.use(express.json());

//permet aux utilisateurs d'accéder à l'api pour faire des requetes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Content-Security-Policy", "default-src 'self'");
  next();
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

//parse req mis ds req.body
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//req post en json
app.use(bodyParser.json());

app.use(helmet({ crossOriginResourcePolicy: false }));

//charge images du dossier images
app.use("/images", express.static(path.join(__dirname, "images")));

//router pour ttes req. vers /api/posts
app.use("/api/post", postRoutes);

//router pour ttes req. vers /api/reply
app.use("/api/reply", replyRoutes);

//router pr ttes req. vers /api/auth
app.use("/api/auth", userRoutes);

module.exports = app;
