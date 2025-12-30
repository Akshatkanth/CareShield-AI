# TrustNet-AI

AI-Powered Content Trust & Risk Analysis Platform for Imagine Cup 2025

## 🚀 Project Overview

TrustNet-AI is an intelligent content analysis platform that uses AI to evaluate the trustworthiness of text content, identify potential misinformation, bias, and manipulation tactics. The platform provides risk scores and detailed recommendations to help users make informed decisions about the content they consume.

## 📁 Project Structure

```
trustnet-ai/
├── backend/          # Express.js API server
├── frontend/         # React frontend application
├── .gitignore
└── README.md
```

## 🛠️ Technology Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **OpenAI API** - AI-powered content analysis
- **Axios** - HTTP client
- **Helmet** - Security middleware
- **Morgan** - Logging
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - API communication
- **CSS3** - Styling

## 🏃 Getting Started

### Prerequisites
- Node.js 16+ installed
- OpenAI API key (or Azure OpenAI credentials)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Open `backend/.env`
   - Add your OpenAI API key:
```env
OPENAI_API_KEY=your_actual_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### `POST /api/analyze`
Analyze text content for trustworthiness and risk factors.

**Request:**
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
    "confidence": "high",
    "analysis": {
      "summary": "Analysis summary",
      "factors": [],
      "recommendations": [],
      "overallAssessment": "Overall assessment"
    }
  }
}
```

### `GET /api/health`
Check API health status.

## 🎯 Features (MVP)

- ✅ Text content analysis using AI
- ✅ Risk score calculation (0-100)
- ✅ Trust level assessment (High/Medium/Low)
- ✅ Identification of risk factors:
  - Misinformation
  - Bias
  - Manipulation tactics
  - Credibility issues
  - Verification status
- ✅ Detailed recommendations
- ✅ Real-time analysis
- ✅ Responsive UI

## 🔒 Security

- Helmet.js for secure HTTP headers
- CORS configuration
- Input validation and sanitization
- Rate limiting ready
- Environment variable protection

## 📝 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Starts Vite dev server with HMR
```

### Build for Production

Backend:
```bash
cd backend
npm start
```

Frontend:
```bash
cd frontend
npm run build
npm run preview
```

## 🤝 Contributing

This project is developed for Imagine Cup 2025. Contributions and suggestions are welcome!

## 📄 License

MIT License

## 🏆 Imagine Cup 2025

This project is submitted as part of Microsoft's Imagine Cup 2025 competition, aiming to combat misinformation and promote digital literacy through AI-powered content analysis.

---

**Made with ❤️ for Imagine Cup 2025**
