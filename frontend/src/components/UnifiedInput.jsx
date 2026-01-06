import React, { useState } from 'react';
import './UnifiedInput.css';

const UnifiedInput = ({ onAnalyze, isLoading }) => {
  const [inputType, setInputType] = useState('text'); // 'text' or 'image'
  const [text, setText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, JPEG, and PNG files are allowed');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    setSelectedImage(file);
    setInputType('image');
    setText(''); // Clear text when image is selected
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setInputType('text');
  };

  const handleTextChange = (value) => {
    setText(value);
    if (value.trim()) {
      setInputType('text');
      setSelectedImage(null); // Clear image when typing
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputType === 'text' && text.trim()) {
      onAnalyze({ type: 'text', content: text });
    } else if (inputType === 'image' && selectedImage) {
      onAnalyze({ type: 'image', content: selectedImage });
    }
  };

  const canAnalyze = (inputType === 'text' && text.trim().length >= 10) || 
                     (inputType === 'image' && selectedImage);

  return (
    <div className="unified-input-container">
      <form onSubmit={handleSubmit}>
        <div className="input-tabs">
          <button
            type="button"
            className={`tab-button ${inputType === 'text' ? 'active' : ''}`}
            onClick={() => {
              setInputType('text');
              setSelectedImage(null);
            }}
            disabled={isLoading}
          >
            📝 Text
          </button>
          <button
            type="button"
            className={`tab-button ${inputType === 'image' ? 'active' : ''}`}
            onClick={() => setInputType('image')}
            disabled={isLoading}
          >
            📷 Image
          </button>
        </div>

        <div className="input-wrapper">
          {inputType === 'text' ? (
            <div className="text-input-section">
              <textarea
                className="text-input"
                value={text}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Paste or type suspicious content to analyze..."
                rows="8"
                disabled={isLoading}
              />
              <div className="input-info">
                <span className="char-count">{text.length} / 10000 characters</span>
              </div>
            </div>
          ) : (
            <div className="image-input-section">
              {!selectedImage ? (
                <div
                  className={`upload-area ${dragActive ? 'drag-active' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="image-upload"
                    className="file-input"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleFileChange}
                    disabled={isLoading}
                  />
                  <label htmlFor="image-upload" className="upload-label">
                    <div className="upload-icon">📷</div>
                    <p className="upload-text">
                      <strong>Click to upload</strong> or drag and drop
                    </p>
                    <p className="upload-hint">JPG, JPEG, PNG (max 5MB)</p>
                  </label>
                </div>
              ) : (
                <div className="image-preview">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className="preview-image"
                  />
                  <div className="image-info">
                    <p className="image-name">{selectedImage.name}</p>
                    <p className="image-size">
                      {(selectedImage.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  {!isLoading && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="remove-button"
                    >
                      ✕ Remove Image
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="analyze-button"
          disabled={!canAnalyze || isLoading}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Content'}
        </button>
      </form>
    </div>
  );
};

export default UnifiedInput;
