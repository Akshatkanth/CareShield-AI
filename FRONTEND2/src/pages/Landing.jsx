// src/pages/Landing.jsx
import unsplash1 from "../assets/unsplash1.png";
import unsplash2 from "../assets/unsplash2.png";
import unsplash3 from "../assets/unsplash3.png";
import unsplash4 from "../assets/unsplash4.png";
import unsplash5 from "../assets/unsplash5.png";
import unsplash6 from "../assets/unsplash6.png";
import unsplash7 from "../assets/unsplash7.png";
import unsplash8 from "../assets/unsplash8.png";
import unsplash9 from "../assets/unsplash9.png";
import unsplash10 from "../assets/unsplash10.png";

import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import {
  Shield,
  Baby,
  GraduationCap,
  Briefcase,
  User,
  HelpCircle,
  LogIn
} from 'lucide-react';
import './Landing.css';

const heroImages = [unsplash1, unsplash2, unsplash3, unsplash4, unsplash5, unsplash6, unsplash7, unsplash8, unsplash9, unsplash10 ];

const Landing = () => {
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  }, 3000);

  return () => clearInterval(interval);
  }, []);


  const handleHowItWorksClick = (e) => {
    e.preventDefault();
    navigate('/how-it-works');
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    navigate('/about');
  };

  const handleStartClick = () => {
    navigate('/home');
  };

  return (
    <div className="page-transition">
      <div className="landing-root">
        {/* NAVBAR */}
        <header className="landing-top-header">
          {/* CLICKABLE LOGO */}
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
              <a href="#about" onClick={handleAboutClick}>
                <HelpCircle size={16} />
                <span>About</span>
              </a>

              <a href="#how-it-works" onClick={handleHowItWorksClick}>
                How it works
              </a>
            </div>

            <button onClick={handleLoginClick}>
              <LogIn size={16} />
              <span>Login</span>
            </button>
          </nav>
        </header>

        {/* GRADIENT DECORATION */}
        <div className="landing-gradient" />
        {/* LEFT SIDE AUTO CHANGING IMAGE */}
{/* RIGHT SIDE IMAGE SLIDER */}
<div className="landing-left-visual">
  <img
    key={currentImage}
    src={heroImages[currentImage]}
    alt="AI Internet Safety"
  />

  {/* CONTROLS */}
  <div className="image-controls">
    <button
      onClick={() =>
        setCurrentImage(
          (currentImage - 1 + heroImages.length) % heroImages.length
        )
      }
    >
      ‹
    </button>

    <button
      onClick={() =>
        setCurrentImage((currentImage + 1) % heroImages.length)
      }
    >
      ›
    </button>
  </div>

  {/* DOTS */}
  <div className="image-dots">
    {heroImages.map((_, index) => (
      <span
        key={index}
        className={index === currentImage ? "active" : ""}
        onClick={() => setCurrentImage(index)}
      />
    ))}
  </div>
</div>



        {/* HERO SECTION */}
        <header className="landing-header">
          <h1 className="landing-title">CareShield AI</h1>
          <p className="landing-subtitle">
            Your Personal AI-Powered Internet Safety Guardian
          </p>
        </header>

        {/* MAIN CONTENT */}
        <main className="landing-main">
          <div className="landing-description-wrapper">
          <p className="landing-description slide-reveal">
            Verify messages, images, links, and profiles instantly. Get AI-powered
            analysis to protect yourself from scams, fake news, deepfakes, and
            online threats.
          </p>
          </div>
          <button className="landing-cta" onClick={handleStartClick}>
            <span>Start Analyzing Now</span>
            <span className="landing-cta-arrow">➜</span>
          </button>

          <div className="landing-badges">
            <div className="landing-badge">
              <Baby className="landing-emoji" size={20} />
              <span>Protects Kids</span>
            </div>
            <div className="landing-badge">
              <GraduationCap className="landing-emoji" size={20} />
              <span>Protects Students</span>
            </div>
            <div className="landing-badge">
              <Briefcase className="landing-emoji" size={20} />
              <span>Protects Adults</span>
            </div>
            <div className="landing-badge">
              <User className="landing-emoji" size={20} />
              <span>Protects Seniors</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Landing;
