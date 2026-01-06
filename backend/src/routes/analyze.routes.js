const express = require('express');
const router = express.Router();
const { analyzeText, analyzeImage, handleChat, healthCheck } = require('../controllers/analyze.controller');
const upload = require('../middlewares/upload.middleware');

// Health check
router.get('/health', healthCheck);

// Analyze text content
router.post('/analyze', analyzeText);

// Analyze image content
router.post('/analyze-image', upload.single('image'), analyzeImage);

// Chat with AI about analysis
router.post('/chat', handleChat);

module.exports = router;
