const aiService = require('../services/ai.service');
const { calculateRiskScore, generateRiskBreakdown } = require('../utils/riskScore.util');

/**
 * Analyze text content
 */
const analyzeText = async (req, res, next) => {
  try {
    const { text, options = {} } = req.body;

    // Validate input
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        error: { message: 'Text content is required and must be a string' }
      });
    }

    if (text.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: { message: 'Text content must be at least 10 characters long' }
      });
    }

    if (text.length > 10000) {
      return res.status(400).json({
        success: false,
        error: { message: 'Text content must not exceed 10,000 characters' }
      });
    }

    // Perform AI analysis
    const analysis = await aiService.analyzeContent(text, options);

    // Calculate risk score
    const riskData = calculateRiskScore(analysis);
    const riskBreakdown = generateRiskBreakdown(analysis.factors || []);

    // Prepare response
    const response = {
      success: true,
      data: {
        riskScore: riskData.riskScore,
        trustLevel: riskData.trustLevel,
        confidence: riskData.confidence,
        analysis: {
          summary: analysis.summary,
          factors: analysis.factors,
          recommendations: analysis.recommendations,
          overallAssessment: analysis.overallAssessment,
          riskBreakdown
        },
        metadata: {
          textLength: text.length,
          analyzedAt: new Date().toISOString()
        }
      }
    };

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Health check endpoint
 */
const healthCheck = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TrustNet-AI API is running',
    timestamp: new Date().toISOString()
  });
};

module.exports = {
  analyzeText,
  healthCheck
};
