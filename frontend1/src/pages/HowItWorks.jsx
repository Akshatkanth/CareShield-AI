import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  Brain,
  ShieldCheck,
  Zap,
  Shield,
  HelpCircle
} from 'lucide-react';

import './HowItWorks.css';

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="page-transition">
      <div className="howitworks-page">
        <div className="bg-pattern" />

        {/* ===== NAVBAR ===== */}
        <header className="page-header">
          {/* LEFT */}
          <div className="nav-left" onClick={() => navigate('/')}>
            <Shield size={26} />
            <span>CareShield AI</span>
          </div>

          {/* CENTER */}
          <div className="nav-center">
            <h1>How it Works</h1>
            <p>Simple protection in just 4 steps</p>
          </div>

          {/* RIGHT */}
          <div className="nav-right">
            <button onClick={() => navigate('/about')}>
              <HelpCircle size={16} />
              About
            </button>
          </div>
        </header>

        {/* ===== STEPS ===== */}
        <div className="steps-grid">
          <div className="step-row">
            <div className="step-card">
              <div className="step-number">1</div>
              <UploadCloud size={40} />
              <h3>Upload Content</h3>
              <p>Share images, links, or text you want to verify</p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <Brain size={40} />
              <h3>AI Analysis</h3>
              <p>Our AI detects deepfakes, scams & fake content automatically</p>
            </div>
          </div>

          <div className="step-row">
            <div className="step-card">
              <div className="step-number">3</div>
              <ShieldCheck size={40} />
              <h3>Get Risk Score</h3>
              <p>Detailed analysis with proof & explanations</p>
            </div>

            <div className="step-card">
              <div className="step-number">4</div>
              <Zap size={40} />
              <h3>Stay Protected</h3>
              <p>Apply safety measures instantly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
