const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken'); 
const maskData = require('maskdata');

require('dotenv').config() // independance qui charge les variable d'environnement




const  emailMask2Options  =  { 
    maskWith : "*" ,  
    unmaskedStartCharactersBeforeAt : 1, 
    unmaskedEndCharactersAfterAt : 1, 
    maskAtTheRate : false 
};




// fonction login qui permet de créer de nouveau utilisateurs
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: maskData.maskEmail2(req.body.email, emailMask2Options),
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({ error }));
};

// fonction login qui permet aux utilisateurs existant de se connecter
exports.login = (req, res, next) => {
    User.findOne({ email: maskData.maskEmail2(req.body.email, emailMask2Options)})
       
        .then(user => {
            if (!user) { 
                return res.status(401).json({ error : 'Utilisateur non trouvé !'});
            }
            bcrypt.compare(req.body.password, user.password) // fonction compare de bcrypt pour comparer le mot de passe entré avec le hash enregistré dans la base de donnée
                .then(valid => {
                    if(!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !'}); // envoie de l'erreur si mot de passe ne correspond pas  
                    }
                    res.status(200).json({ // envoie de la réponse contenant l'id utilisateur et le token 
                        userId: user._id,
                        token: jwt.sign( // fonction sign de jwt pour encoder un nouveau token
                            { userId: user._id },
                            process.env.CLE_SECRETE, // chaine secrète de developpement pour encoder notre token 
                            { expiresIn: '24h'} // durée de validité du token (l'utilisateur devra se reconnecter au bout de 24h)
                        )
                    });
                })
                .catch(error => res.status(500).json({ error}));
        })
        .catch(error => res.status(500).json({ error }));
};

