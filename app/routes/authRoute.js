const express = require('express');

const authontroler = require('../controllers/authControler');

const router = express.Router();

router.route('/signup').post(authontroler.signup);
router.route('/signin').post(authontroler.signin);

module.exports = router