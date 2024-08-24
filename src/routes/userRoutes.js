const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.route('/profile').get(verifyToken, getUserProfile).put(verifyToken, updateUserProfile);

module.exports = router;

