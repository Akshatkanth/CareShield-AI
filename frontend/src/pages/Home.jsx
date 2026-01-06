import React, { useState } from 'react';
import UnifiedInput from '../components/UnifiedInput';
import ResultCard from '../components/ResultCard';
import Loader from '../components/Loader';
import ChatBot from '../components/ChatBot';
import { analyzeText, analyzeImage } from '../services/api';
import './Home.css';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [analysisType, setAnalysisType] = useState('text');

  const handleAnalyze = async (data) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setAnalysisType(data.type);

    try {
      let response;
      if (data.type === 'text') {
        response = await analyzeText(data.content, { detailed: true });
      } else if (data.type === 'image') {
        response = await analyzeImage(data.content, { detailed: true });
      }
      setResult(response);
    } catch (err) {
      setError(err.message || `Failed to analyze ${data.type}. Please try again.`);
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-content">
          <h1 className="title">TrustNet-AI</h1>
          <p className="subtitle">
            AI-Powered Content Trust & Risk Analysis
          </p>
        </div>
      </header>

      <main className="main-content">
        <UnifiedInput onAnalyze={handleAnalyze} isLoading={isLoading} />

        {isLoading && <Loader message={`Analyzing ${analysisType} with AI...`} />}

        {error && (
          <div className="error-message">
            <div className="error-content">
              <h3>⚠️ Analysis Error</h3>
              <p>{error}</p>
              <button onClick={handleReset} className="retry-button">
                Try Again
              </button>
            </div>
          </div>
        )}

        {result && !isLoading && <ResultCard result={result} />}

  {result && !isLoading && <ChatBot analysisContext={result.data} />}

        {result && (
          <div className="action-buttons">
            <button onClick={handleReset} className="reset-button">
              Analyze New Content
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>
          Made for Imagine Cup 2025 | Powered by AI
        </p>
      </footer>
    </div>
  );
};

export default Home;
