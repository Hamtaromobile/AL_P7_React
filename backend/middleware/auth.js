//middleware d'authentification

const jwt = require("jsonwebtoken");

//extraction info. du token
module.exports = (req, res, next) => {
	try {
		// tab. [0] "bear", [1] token
		const token = req.headers.authorization.split(" ")[1];

		//décoder token ac clé
		const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");

		//recup. userId et isAdmin qui ont été encodé ds le token
		const userId = decodedToken.userId;
		const userIsAdmin = decodedToken.userIsAdmin;

		//transmet req.auth aux routes
		req.auth = {
			userId: userId,
			userIsAdmin: userIsAdmin,
		};

		next();
	} catch (error) {
		res.status(401).json({ message: "non auth", error });
	}
};
