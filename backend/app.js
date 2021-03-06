// modules npm 
const express = require('express');
const bodyParser = require('body-parser'); // permet d'extraire l'objet JSON de la demande POST
const mongoose = require('mongoose'); // permet d'interagir avec notre base de donnée
const helmet = require('helmet'); // sécurisation des en tete http

const path = require('path'); // permet d'accèder aux chemins de fichiers et répertoire
require('dotenv').config() // independance qui charge les variable d'environnement

//appel d'express dans l'application
const app = express();

app.use(helmet());

//variables de stockage des routes
const saucesRoutes = require('./routes/sauces');
const usersRoutes = require('./routes/users');


//connection à la base de donnée
mongoose.connect(process.env.MONGO_URI,
    {   useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


//implémentation de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// middleware qui analyser le corps de la demande POST
app.use(express.json());

// gestion des images dans le fichier image qui est statique
app.use('/images', express.static(path.join(__dirname, 'images')));

// enregistrement des routes 
 app.use('/api/sauces', saucesRoutes);
 app.use('/api/auth', usersRoutes);



module.exports = app;