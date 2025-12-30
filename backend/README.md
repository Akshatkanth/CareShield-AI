# TrustNet-AI Backend

Backend API for TrustNet-AI content analysis platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env` and update with your API keys
   - Add your OpenAI API key

3. Run the development server:
```bash
npm run dev
```

4. Run the production server:
```bash
npm start
```

## API Endpoints

### POST /api/analyze
Analyze text content for trustworthiness and risk factors.

**Request Body:**
```json
{
  "text": "Content to analyze",
  "options": {
    "detailed": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "riskScore": 75,
    "trustLevel": "medium",
    "analysis": {
      "summary": "Analysis summary",
      "factors": [],
      "recommendations": []
    }
  }
}
```

## Environment Variables

- `PORT` - Server port (default: 5000)
- `OPENAI_API_KEY` - Your OpenAI API key
- `OPENAI_API_ENDPOINT` - OpenAI API endpoint
- `OPENAI_MODEL` - Model to use (default: gpt-4)
