// src/pages/About.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, HelpCircle } from "lucide-react";
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  /* PROFESSIONAL BORDERED NAV BUTTON STYLE */
  const navBtnStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    borderRadius: "10px",
    border: "2px solid rgba(92, 61, 139, 0.9)",
    color: "#490378ff",
    background: "transparent",
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "none"
  };

  return (
    <div className="page-transition">
      <div className="about-page">
        {/* NAVBAR */}
        <header className="about-navbar navbar glass-navbar">
          <div
            className="header-logo"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
            title="Go to home page"
          >
            <Shield size={26} />
            <span>CareShield AI</span>
          </div>

          <nav className="header-nav">
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                navigate("/how-it-works");
              }}
              className="nav-btn bordered-btn"
            >
              <HelpCircle size={16} />
              <span>How it works</span>
            </a>
          </nav>
        </header>

        {/* Hero Header */}
        <div className="about-hero">
          <div className="hero-content">
            <h1>About CareShield AI</h1>
            <p>Your Personal Internet Safety Guardian</p>
          </div>
        </div>

        {/* Main Content Container */}
        <div className="about-main">
          {/* Info Cards Row */}
          <div className="info-cards">
            <div className="info-card problem-card">
              <div className="card-icon">🚨</div>
              <h3>The Problem</h3>
              <p>
                Internet full of scams, fake websites, fraud messages across all
                age groups
              </p>
            </div>

            <div className="info-card solution-card">
              <div className="card-icon">🧠</div>
              <h3>Our Solution</h3>
              <p>
                AI-powered analysis detecting scams, deepfakes & risky behavior
                instantly
              </p>
            </div>

            <div className="info-card impact-card">
              <div className="card-icon">🌍</div>
              <h3>Social Impact</h3>
              <p>
                Protects kids, students, adults & seniors while promoting digital
                literacy
              </p>
            </div>

            <div className="info-card team-card">
              <div className="card-icon">👨‍💻</div>
              <h3>Our Team</h3>
              <p>
                4 CSE students collaborating on research, AI development &
                testing
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="team-section">
            <h2>Meet Our Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">👤</div>
                <h3>Arnav Gupta</h3>
                <p>
                  <strong>Branch:</strong> CSE
                </p>
                <p>
                  <strong>Graduating Year:</strong> 2027
                </p>
              </div>

              <div className="team-member">
                <div className="member-avatar">👤</div>
                <h3>Anushka Gupta</h3>
                <p>
                  <strong>Branch:</strong> CSE
                </p>
                <p>
                  <strong>Graduating Year:</strong> 2027
                </p>
              </div>

              <div className="team-member">
                <div className="member-avatar">👤</div>
                <h3>Akshat Prakash Kanth</h3>
                <p>
                  <strong>Branch:</strong> CSE
                </p>
                <p>
                  <strong>Graduating Year:</strong> 2027
                </p>
              </div>

              <div className="team-member">
                <div className="member-avatar">👤</div>
                <h3>Tanisha Bajaj</h3>
                <p>
                  <strong>Branch:</strong> CSE
                </p>
                <p>
                  <strong>Graduating Year:</strong> 2027
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Content */}
          <div className="detailed-content">
            {/* Problem Statement */}
            <div className="content-section">
              <h2>🚨 The Problem Statement</h2>
              <div className="problem-grid">
                <div className="problem-item">
                  <h4>👶 Kids</h4>
                  <p>Online predators, fake game rewards</p>
                </div>
                <div className="problem-item">
                  <h4>🎓 Students</h4>
                  <p>Fake jobs, fake internships</p>
                </div>
                <div className="problem-item">
                  <h4>👨 Adults</h4>
                  <p>UPI scams, fake websites, deepfake videos</p>
                </div>
                <div className="problem-item">
                  <h4>👴 Seniors</h4>
                  <p>OTP fraud, lottery scams</p>
                </div>
              </div>
              </div>

            {/* Solution Details */}
            <div className="content-section">
              <h2>🛡️ Proposed Solution</h2>
              <p>
                CareShield AI is a web app + browser extension that acts as your
                personal internet safety assistant.
              </p>
              <div className="solution-examples">
                <div className="example-card">"Is this person safe?"</div>
                <div className="example-card">"Is this job genuine?"</div>
                <div className="example-card">"Is this message real?"</div>
              </div>
              <p>
                AI responds with Risk Score, proof reasons, next steps & safe
                alternatives.
              </p>
            </div>

            {/* Workflow */}
            <div className="content-section">
              <h2>⚙️ How It Works</h2>
              <div className="workflow-steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <p>User uploads content (chat, image, link)</p>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <p>
                    Microsoft Azure AI services analyze for scams, deepfakes,
                    predators
                  </p>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <p>ML model calculates Risk Score (0-100%)</p>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <p>Azure OpenAI explains in simple language</p>
                </div>
                <div className="step">
                  <div className="step-number">5</div>
                  <p>Safety suggestions provided</p>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="content-section">
              <h2>🛠️ Technology Stack</h2>
              <div className="tech-stack-grid">
                <div className="tech-item">
                  <span>Frontend: </span>
                  <strong>HTML/ CSS/ JS/ React JS</strong>
                </div>
                <div className="tech-item">
                  <span>Backend: </span>
                  <strong>Node JS/Express JS</strong>
                </div>
                <div className="tech-item">
                  <span>AI Services: </span>
                  <strong>Azure AI Vision, Language, OpenAI</strong>
                </div>
                <div className="tech-item">
                  <span>Database: </span>
                  <strong>Azure Cosmos DB</strong>
                  <span>   (Future Advancement)</span>
                </div>
                <div className="tech-item">
                  <span>AI Model: </span>
                  <strong>gpt 4o mini</strong>
                </div>
                <div className="tech-item">
                  <span>Extension: </span>
                  <strong>Chrome Extension</strong>
                  <span>   (Future Advancement)</span>
                </div>
                <div className="tech-item">
                  <span>Version Control: </span>
                  <strong>Git/GitHub</strong>
                </div>
                <div className="tech-item">
                  <span>Development: </span>
                  <strong>VS Code</strong>
                </div>
              </div>
            </div>

            {/* Microsoft AI Services Table */}
            <div className="content-section">
              <h2>🔵 Microsoft AI Services Used</h2>
              <table className="ai-services-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Azure AI Language</td>
                    <td>Analyze messages & chats</td>
                  </tr>
                  <tr>
                    <td>Azure AI Vision</td>
                    <td>Detect fake/edited images</td>
                  </tr>
                  <tr>
                    <td>Azure OpenAI</td>
                    <td>Human-like explanations</td>
                  </tr>
                  <tr>
                    <td>Cosmos DB <small>(Future Advancement)</small></td>
                    <td>Scam threat database</td>
                  </tr>
                   <tr>
                    <td>Hosting of app</td>
                    <td>Azure app services</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Business Model */}
            <div className="content-section">
              <h2>💰 Business Model (Future)</h2>
              <div className="business-grid">
                <div className="business-card">
                  <h4>Freemium</h4>
                  <p>Free basic checks, Premium full protection</p>
                </div>
                <div className="business-card">
                  <h4>B2B</h4>
                  <p>Banks, schools, companies</p>
                </div>
                <div className="business-card">
                  <h4>API</h4>
                  <p>Sell API to other apps</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="about-footer">
          <p>
            Built with ❤️ as a college project to create a safer digital future
          </p>
          <p>© 2026 CareShield AI Team | All rights reserved</p>
        </footer>
      </div>
    </div>
  );
};

export default About;
