// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, HelpCircle } from 'lucide-react';

import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? 'Login' : 'Signup', { email, password, name });
  };

  return (
    <div className="page-transition">
      <div className="login-page">
        {/* NAVBAR */}
        <header className="login-header">
          <div
            className="header-logo"
            onClick={() => navigate('/')}
            title="Go to home page"
          >
            <Shield size={26} />
            <span>CareShield AI</span>
          </div>

          <nav className="header-nav">
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
          </nav>
        </header>

        {/* PAGE HEADER */}
        <header className="login-header-content">
          <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p>
            {isLogin
              ? 'Login to your CareShield AI account'
              : 'Join CareShield AI today'}
          </p>
        </header>

        {/* MAIN CONTENT */}
        <main className="login-main">
          <div className="login-container">
            <div className="form-tabs">
              <button
                className={`tab-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`tab-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="input-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            <div className="form-footer">
              <p>
                {isLogin
                  ? "Don't have an account?"
                  : 'Already have an account?'}
                <button
                  type="button"
                  className="toggle-link"
                  onClick={toggleForm}
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </div>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-buttons">
              <button className="social-btn google">
                <span>Google</span>
              </button>
              <button className="social-btn github">
                <span>GitHub</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
