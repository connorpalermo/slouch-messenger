const express = require('express');

const { signup, login } = require('../controllers/auth.js');

const router = express.Router();

router.post('/signup');

router.post('/login');

module.exports = router; // now the router can be used outside of this class