//middleware d'authentification 

const jwt = require('jsonwebtoken');

//extraction info. du token
module.exports = (req, res, next) => {
    try {
        // tab. [0] "bear", [1] token  
        const token = req.headers.authorization.split(' ')[1];
        //décoder token ac clé
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET' );
        //recup. userId qui à été encodé ds le token
        const userId = decodedToken.userId;
        //transmet req.auth aux routes 
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};