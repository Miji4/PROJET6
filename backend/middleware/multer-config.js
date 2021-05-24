const multer = require('multer');

const MIME_TYPES = { // mime-type des differentes extensions que l'on peut recevoir du frontend
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

//configuration de multer pour déterminer où le fichier doit être stocké.
const storage = multer.diskStorage({
    destination: (req, file, callback) => { // fonction qui indique à multer d enregistrer les fichiers dans le dossiers images 
        callback(null, 'images');
    },
    filename: (req, file, callback) => { // fonction qui gènere un nouveau nom de fichier le plus unique possible avec le timestamp
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');