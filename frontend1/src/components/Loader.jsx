import React from 'react';
import './Loader.css';

const Loader = ({ message = 'Analyzing content...' }) => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="spinner"></div>
      </div>
      <p className="loader-message">{message}</p>
    </div>
  );
};

export default Loader;
