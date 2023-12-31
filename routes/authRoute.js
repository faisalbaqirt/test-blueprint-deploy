const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuthenticated = require('../middleware/isAuthenticated')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', isAuthenticated, authController.profile);
router.put('/profile/:id', isAuthenticated, authController.editProfile);
router.get('/user', authController.getAllUsers)
router.get('/user/:id', authController.getUserById)
router.delete('/user/:id', authController.deleteUser)

module.exports = router;