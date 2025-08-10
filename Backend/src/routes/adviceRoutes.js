const express = require('express');
const router = express.Router();
const { getAdvice, getProfile } = require('../controllers/adviceController');

router.post('/advice', getAdvice);
router.get('/profile/:userId', getProfile);

module.exports = router;