/**
 * Calculate risk score based on analysis factors
 * @param {Object} analysis - Analysis data from AI service
 * @returns {Object} Risk score and trust level
 */
const calculateRiskScore = (analysis) => {
  // Extract risk factors from analysis
  const factors = analysis.factors || [];
  
  let riskScore = 0;
  let totalWeight = 0;

  // Define risk factors and their weights
  const riskWeights = {
    misinformation: 30,
    bias: 20,
    manipulation: 25,
    credibility: 15,
    verification: 10
  };

  // Calculate weighted risk score
  factors.forEach(factor => {
    const weight = riskWeights[factor.type] || 10;
    riskScore += (factor.severity || 5) * weight;
    totalWeight += weight * 10; // Assuming max severity is 10
  });

  // Normalize to 0-100 scale
  const normalizedScore = totalWeight > 0 ? (riskScore / totalWeight) * 100 : 0;
  
  // Determine trust level
  let trustLevel;
  if (normalizedScore < 30) {
    trustLevel = 'high';
  } else if (normalizedScore < 60) {
    trustLevel = 'medium';
  } else {
    trustLevel = 'low';
  }

  return {
    riskScore: Math.round(normalizedScore),
    trustLevel,
    confidence: calculateConfidence(factors.length)
  };
};

/**
 * Calculate confidence level based on number of factors analyzed
 */
const calculateConfidence = (factorCount) => {
  if (factorCount >= 5) return 'high';
  if (factorCount >= 3) return 'medium';
  return 'low';
};

/**
 * Generate risk breakdown by category
 */
const generateRiskBreakdown = (factors) => {
  const breakdown = {
    misinformation: 0,
    bias: 0,
    manipulation: 0,
    credibility: 0,
    verification: 0
  };

  factors.forEach(factor => {
    if (breakdown[factor.type] !== undefined) {
      breakdown[factor.type] += factor.severity || 0;
    }
  });

  return breakdown;
};

module.exports = {
  calculateRiskScore,
  generateRiskBreakdown,
  calculateConfidence
};
