const axios = require('axios');
const config = require('../config/env');

/**
 * AI Service for content analysis using OpenAI
 */
class AIService {
  constructor() {
    this.apiKey = config.azure.apiKey;
    this.endpoint = config.azure.endpoint;
    this.deployment = config.azure.deployment;
    this.apiVersion = config.azure.apiVersion;
  }

  /**
   * Analyze text content for trustworthiness and risk factors
   * @param {string} text - Text content to analyze
   * @param {Object} options - Analysis options
   * @returns {Object} Analysis results
   */
  async analyzeContent(text, options = {}) {
    try {
      if (!text || text.trim().length === 0) {
        throw new Error('Text content is required for analysis');
      }

      const prompt = this.buildAnalysisPrompt(text, options);
      
      const azureUrl = `${this.endpoint}/openai/deployments/${this.deployment}/chat/completions?api-version=${this.apiVersion}`;
      console.log('🔍 Calling Azure OpenAI URL:', azureUrl);
      console.log('🔑 Using deployment:', this.deployment);
      
      const response = await axios.post(
        azureUrl,
        {
          messages: [
            {
              role: 'system',
              content: 'You are an expert content analyst specializing in identifying misinformation, bias, manipulation tactics, and assessing credibility. Provide structured analysis in JSON format.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 1500
        },
        {
          headers: {
            'api-key': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      return this.parseAIResponse(aiResponse);
    } catch (error) {
      console.error('AI Service Error:', error.message);
      throw new Error(`AI analysis failed: ${error.message}`);
    }
  }

  /**
   * Build analysis prompt for AI
   */
  buildAnalysisPrompt(text, options) {
    return `Analyze the following content for trustworthiness and identify potential risks:

Content: "${text}"

Please provide a detailed analysis in the following JSON format:
{
  "summary": "Brief summary of the analysis",
  "factors": [
    {
      "type": "misinformation|bias|manipulation|credibility|verification",
      "severity": 1-10,
      "description": "Description of the risk factor",
      "evidence": "Specific evidence from the content"
    }
  ],
  "recommendations": ["List of recommendations for the reader"],
  "overallAssessment": "Overall assessment of content trustworthiness"
}

Focus on:
1. Factual accuracy and potential misinformation
2. Bias and one-sided perspectives
3. Manipulation tactics (emotional appeals, logical fallacies)
4. Source credibility indicators
5. Verification status of claims

${options.detailed ? 'Provide detailed analysis for each factor.' : 'Provide concise analysis.'}`;
  }

  /**
   * Parse AI response and extract structured data
   */
  parseAIResponse(aiResponse) {
    try {
      // Try to extract JSON from the response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback: create structured response from text
      return {
        summary: aiResponse.substring(0, 200),
        factors: [],
        recommendations: ['Unable to parse detailed analysis. Please review the content carefully.'],
        overallAssessment: 'Analysis completed but structured data unavailable'
      };
    } catch (error) {
      console.error('Parse error:', error);
      return {
        summary: 'Error parsing analysis results',
        factors: [],
        recommendations: ['Analysis completed with parsing errors'],
        overallAssessment: 'Please review the content manually'
      };
    }
  }
}

module.exports = new AIService();
