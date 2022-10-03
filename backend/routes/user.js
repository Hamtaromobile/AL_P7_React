//route user

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

//signup
router.post('/signup', userCtrl.signup);

//login
router.post('/login', userCtrl.login);

module.exports = router