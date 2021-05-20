//variable module npm token
const jwt = require('jsonwebtoken');


// création du middleware qui va protèger les routes selectionnées et vérifier que l'utilisateur est authentifié avant d'autoriser l envoi de ses requetes
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // selection du token du header 'Authorization' de la requete entrante
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // fonction verify pour décoder le token 
        const userId = decodedToken.userId; // j'extrais l'ID utilisateur du token 
        if(req.body.userId && req.body.userId !== userId) { // comparaison des 2 ID utilisateur (l'id utilisateur et celui extrait du token)
            throw 'Invalid user ID'; // erreur si différent 

        }else {
            next(); // fonction next si utilisateur est authentifié
        }
    } catch{
        res.status(401).json({
            error: new Error('Invalid request !')
        });
    }
};