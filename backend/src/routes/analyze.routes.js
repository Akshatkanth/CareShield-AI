const express = require('express');
const router = express.Router();
const { analyzeText, healthCheck } = require('../controllers/analyze.controller');

// Health check
router.get('/health', healthCheck);

// Analyze text content
router.post('/analyze', analyzeText);

module.exports = router;
