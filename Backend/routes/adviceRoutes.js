const express = require('express');
const router = express.Router();

// Controller
const { getAgriAdvice } = require('../controllers/adviceController');

// New endpoint: POST /api/get-agri-advice
router.post('/get-agri-advice', getAgriAdvice);

module.exports = router;
