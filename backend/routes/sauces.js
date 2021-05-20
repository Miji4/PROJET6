const express = require('express');
const router = express.Router();

// import du middleware auth pour protèger nos routes 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// ici nous importons nos controllers
const saucesCtrl = require('../controllers/sauces');

// ici nous enregistrons nos routes en tant que fonction 
// voir partie du cours configurer les controllers

router.post('/',auth, multer, saucesCtrl.createSauce);
router.get('/', auth, saucesCtrl.getAllSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce)
router.delete('/:id', auth, saucesCtrl.deleteSauce)
router.post('/:id/like', auth, saucesCtrl.likeSauce)


module.exports = router;