const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', userController.authUser);
router.route('/')
  .post(userController.registerUser);
router.route('/profile')
  .get(protect, userController.getUserProfile);

module.exports = router;