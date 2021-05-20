const express = require('express');
const router = express.Router();

//const auth = require('../middleware/auth');

// ici nous importons nos controllers
const usersCtrl = require('../controllers/users');




// routes pour l'inscription et le login
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);

module.exports = router;