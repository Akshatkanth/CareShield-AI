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
//
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
   * Analyze image content for scams and trustworthiness
   * @param {Buffer} imageBuffer - Image file buffer
   * @param {string} mimeType - Image MIME type
   * @param {Object} options - Analysis options
   * @returns {Object} Analysis results
   */
  async analyzeImage(imageBuffer, mimeType, options = {}) {
    try {
      if (!imageBuffer || imageBuffer.length === 0) {
        throw new Error('Image buffer is required for analysis');
      }

      // Convert image to base64
      const base64Image = imageBuffer.toString('base64');
      const dataUrl = `data:${mimeType};base64,${base64Image}`;

      const prompt = this.buildImageAnalysisPrompt(options);
      
      const azureUrl = `${this.endpoint}/openai/deployments/${this.deployment}/chat/completions?api-version=${this.apiVersion}`;
      console.log('🔍 Calling Azure OpenAI URL for image:', azureUrl);
      
      const response = await axios.post(
        azureUrl,
        {
          messages: [
            {
              role: 'system',
              content: 'You are an expert at detecting scams, fake offers, phishing attempts, and manipulative content in images. Analyze images for trust and safety.'
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: prompt
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: dataUrl
                  }
                }
              ]
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
      console.error('AI Service Error (Image):', error.message);
      throw new Error(`AI image analysis failed: ${error.message}`);
    }
  }

  //
  /**
   * Chat with context about previous analysis
   */
  async chatWithContext(userMessage, analysisContext = null, conversationHistory = []) {
    try {
      if (!userMessage || userMessage.trim().length === 0) {
        throw new Error('Message is required');
      }

      const messages = [
        {
          role: 'system',
          content: 'You are a helpful AI assistant specializing in content safety, scam detection, and digital literacy. Answer user questions about their analysis results in a clear, concise, and helpful manner.'
        }
      ];

      if (analysisContext) {
        messages.push({
          role: 'system',
          content: `Context from previous analysis:\nRisk Score: ${analysisContext.riskScore}\nTrust Level: ${analysisContext.trustLevel}\nSummary: ${analysisContext.analysis?.summary || 'N/A'}\n\nUse this context to answer the user's questions.`
        });
      }

      conversationHistory.forEach(msg => {
        messages.push({
          role: msg.role,
          content: msg.content
        });
      });

      messages.push({
        role: 'user',
        content: userMessage
      });

      const azureUrl = `${this.endpoint}/openai/deployments/${this.deployment}/chat/completions?api-version=${this.apiVersion}`;
  
      const response = await axios.post(
        azureUrl,
        {
          messages: messages,
          temperature: 0.7,
          max_tokens: 800
        },
        {
          headers: {
            'api-key': this.apiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      return {
        message: aiResponse,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('AI Service Error (Chat):', error.message);
      throw new Error(`Chat failed: ${error.message}`);
    }
  }

  /**
   * Build analysis prompt for image
   */
  buildImageAnalysisPrompt(options) {
    return `Analyze this image for potential scams, fraud, or manipulative content.

Please provide a detailed analysis in the following JSON format:
{
  "summary": "Brief summary of what you see and the risk level",
  "factors": [
    {
      "type": "misinformation|bias|manipulation|credibility|verification",
      "severity": 1-10,
      "description": "Description of the risk factor",
      "evidence": "Specific visual elements that indicate this risk"
    }
  ],
  "recommendations": ["List of recommendations for the viewer"],
  "overallAssessment": "Overall safety assessment of this image"
}

Focus on:
1. Fake job offers or "too good to be true" promises
2. Requests for money, payment, or personal information
3. Urgency tactics ("Limited time", "Act now")
4. Suspicious URLs or QR codes
5. Impersonation of legitimate brands
6. Poor quality or manipulated images
7. Grammatical errors or unprofessional design

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
