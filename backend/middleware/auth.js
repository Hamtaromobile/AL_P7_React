//middleware d'authentification

const jwt = require("jsonwebtoken");

//extraction info. du token
module.exports = (req, res, next) => {
  //console.log("req.headers.authorization", req.headers.authorization);
  try {
    // tab. [0] "bear", [1] token
    const token = req.headers.authorization.split(" ")[1];
    console.log("token", token);
    //décoder token ac clé
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    console.log("decodedToken", decodedToken);

    //recup. userId qui à été encodé ds le token
    const userId = decodedToken.userId;
    console.log("userId", userId);

    //transmet req.auth aux routes
    req.auth = {
      userId: userId,
    };

    console.log("req.auth.userId", req.auth.userId);
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
