import React from 'react';
import './ResultCard.css';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { riskScore, trustLevel, confidence, analysis } = result.data;

  const getTrustColor = (level) => {
    switch (level) {
      case 'high': return '#48bb78';
      case 'medium': return '#ed8936';
      case 'low': return '#f56565';
      default: return '#718096';
    }
  };

  const getTrustLabel = (level) => {
    switch (level) {
      case 'high': return 'High Trust';
      case 'medium': return 'Medium Trust';
      case 'low': return 'Low Trust';
      default: return 'Unknown';
    }
  };

  return (
    <div className="result-card">
      <div className="result-header">
        <h2>Analysis Results</h2>
      </div>

      <div className="risk-score-section">
        <div className="score-circle" style={{ borderColor: getTrustColor(trustLevel) }}>
          <div className="score-value">{riskScore}</div>
          <div className="score-label">Risk Score</div>
        </div>
        <div className="trust-info">
          <div className="trust-level" style={{ color: getTrustColor(trustLevel) }}>
            {getTrustLabel(trustLevel)}
          </div>
          <div className="confidence-badge">
            Confidence: <strong>{confidence}</strong>
          </div>
        </div>
      </div>

      {analysis.summary && (
        <div className="analysis-section">
          <h3>Summary</h3>
          <p>{analysis.summary}</p>
        </div>
      )}

      {analysis.factors && analysis.factors.length > 0 && (
        <div className="analysis-section">
          <h3>Risk Factors</h3>
          <div className="factors-list">
            {analysis.factors.map((factor, index) => (
              <div key={index} className="factor-item">
                <div className="factor-header">
                  <span className="factor-type">{factor.type}</span>
                  <span className="factor-severity">
                    Severity: {factor.severity}/10
                  </span>
                </div>
                <p className="factor-description">{factor.description}</p>
                {factor.evidence && (
                  <p className="factor-evidence">
                    <em>Evidence: {factor.evidence}</em>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <div className="analysis-section">
          <h3>Recommendations</h3>
          <ul className="recommendations-list">
            {analysis.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      {analysis.overallAssessment && (
        <div className="analysis-section overall-assessment">
          <h3>Overall Assessment</h3>
          <p>{analysis.overallAssessment}</p>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
