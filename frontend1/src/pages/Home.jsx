// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, HelpCircle, LogIn } from 'lucide-react';

import TextInput from '../components/TextInput';
import ResultCard from '../components/ResultCard';
import Loader from '../components/Loader';
import ChatBot from '../components/ChatBot';
import { analyzeText, analyzeImage } from '../services/api';

import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const [text, setText] = useState('');
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim() && files.length === 0) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let response;

      // If there are files, analyze the first image
      if (files.length > 0) {
        const imageFile = files[0];
        // Check if it's an image file
        if (imageFile.type.startsWith('image/')) {
          response = await analyzeImage(imageFile, { detailed: true });
        } else {
          // If not an image, fall back to text analysis or show error
          if (text.trim()) {
            response = await analyzeText(text, { detailed: true });
          } else {
            throw new Error('Please provide an image or text content to analyze');
          }
        }
      } else if (text.trim()) {
        // Only text, no files
        response = await analyzeText(text, { detailed: true });
      }

      setResult(response);
    } catch (err) {
      setError(err.message || 'Failed to analyze content. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setText('');
    setFiles([]);
    setResult(null);
    setError(null);
  };

  return (
    <div className="page-transition">
      <div className="home-container">
        {/* NAVBAR */}
        <header className="header">
          <div
            className="header-logo"
            onClick={() => navigate('/')}
            title="Go to home page"
          >
            <Shield className="header-icon" size={28} />
            <span className="header-title">CareShield AI</span>
          </div>

          <nav className="header-nav">
            <div className="nav-left">
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/about');
                }}
              >
                <HelpCircle size={16} />
                <span>About</span>
              </a>

              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/how-it-works');
                }}
              >
                How it works
              </a>
            </div>

            <button onClick={() => navigate('/login')}>
              <LogIn size={16} />
              <span>Login</span>
            </button>
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main className="main-content">
          <TextInput
            value={text}
            onChange={setText}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            onFilesChange={setFiles}
          />

          {isLoading && <Loader message="Analyzing content with AI..." />}

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

          {result && !isLoading && <ResultCard result={result} onChatOpen={() => setShowChat(true)} />}

          {result && (
            <div className="action-buttons">
              <button onClick={handleReset} className="reset-button">
                Analyze New Content
              </button>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <p>Made for Imagine Cup 2025 | Powered by AI</p>
        </footer>
      </div>

      {/* Chat Bot Modal */}
      {showChat && result && (
        <ChatBot
          analysisResult={result.data}
          onClose={() => setShowChat(false)}
        />
      )}

      {/* Floating Chat Button */}
      {result && !showChat && (
        <button
          className="floating-chat-button"
          onClick={() => setShowChat(true)}
          title="Chat with AI Assistant"
        >
          <span className="chat-icon">💬</span>
        </button>
      )}
    </div>
  );
};

export default Home;
