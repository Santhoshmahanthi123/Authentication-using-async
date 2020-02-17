const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
router.post('/signup', userController.user_signup);
router.post('/login', userController.user_login);
router.post('/user_remove/:id', userController.user_remove);
router.post('/user_find_all', userController.user_find_all);
router.post('/user_find/:id', userController.user_find);

module.exports = router;