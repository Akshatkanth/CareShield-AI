import React from 'react';
import './TextInput.css';

const TextInput = ({ value, onChange, onAnalyze, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onAnalyze();
    }
  };

  return (
    <div className="text-input-container">
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <textarea
            className="text-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste or type content to analyze for trustworthiness..."
            rows="8"
            disabled={isLoading}
          />
          <div className="input-info">
            <span className="char-count">{value.length} / 10000 characters</span>
          </div>
        </div>
        <button 
          type="submit" 
          className="analyze-button"
          disabled={!value.trim() || isLoading || value.length < 10}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Content'}
        </button>
      </form>
    </div>
  );
};

export default TextInput;
