import React, { useState } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onImageSelect, isLoading, selectedImage }) => {
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

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, JPEG, and PNG files are allowed');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    onImageSelect(file);
  };

  const handleRemove = () => {
    onImageSelect(null);
  };

  return (
    <div className="image-upload-container">
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
            onChange={handleChange}
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
            <button onClick={handleRemove} className="remove-button">
              ✕ Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
