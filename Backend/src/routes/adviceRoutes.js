const express = require('express');
const router = express.Router();
const { getAdvice, getProfile, getAgriAdvice } = require('../controller/adviceController');

router.post('/advice', getAdvice);
router.post('/get-agri-advice', getAgriAdvice);
router.get('/profile/:userId', getProfile);
module.exports = router;