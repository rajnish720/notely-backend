const express = require('express');
const userController = require('../controllers/usre.controller');

const router = express.Router();

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;