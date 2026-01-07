// src/components/TextInput.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Smile, Mic } from 'lucide-react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './TextInput.css';

const TextInput = ({ value, onChange, onAnalyze, isLoading, onFilesChange }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  // NEW: voice base text
  const [voiceBaseText, setVoiceBaseText] = useState('');

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition(); // [web:15][web:42]

  // Jab listening on ho, transcript change hote hi text update karo
  useEffect(() => {
    if (!listening) return;
    onChange(voiceBaseText + (transcript ? ' ' + transcript : ''));
  }, [transcript, listening, voiceBaseText, onChange]); // [web:12]

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() || files.length > 0) onAnalyze();
  };

  const updateFiles = (newFiles) => {
    setFiles(newFiles);
    if (onFilesChange) onFilesChange(newFiles);
  };

  const handleFilesInput = (selected) => {
    if (!selected || selected.length === 0) return;

    // Accept only images for preview; keep only first image for analysis UX
    const imageFile = selected.find((f) => f.type && f.type.startsWith('image/'));
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(imageFile);
      updateFiles([imageFile]);
    }
  };

  const handleFileSelected = (e) => {
    const selected = Array.from(e.target.files || []);
    handleFilesInput(selected);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleClearFiles = () => {
    updateFiles([]);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEmojiSelect = (emoji) => {
    if (imagePreview) return;
    onChange(value + emoji.native);
  };

  const handleToggleVoice = () => {
    if (imagePreview) return;
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser doesn't support voice input.");
      return;
    }

    if (listening) {
      // STOP: jo likha gaya hai, woh already parent state me saved hai
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      // START: current text ko base bana lo
      setVoiceBaseText(value || '');
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: true,
        language: 'en-IN',
      });
    }
  };

  return (
    <div className="text-input-container">
      <form onSubmit={handleSubmit} className="input-wrapper">
        <div
          className={`text-input-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isLoading || !!imagePreview || !!value.trim()) return;
            setDragCounter((c) => c + 1);
            setDragActive(true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isLoading || !!imagePreview || !!value.trim()) return;
            e.dataTransfer.dropEffect = 'copy';
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragCounter((c) => {
              const next = Math.max(0, c - 1);
              if (next === 0) setDragActive(false);
              return next;
            });
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragCounter(0);
            setDragActive(false);
            if (isLoading || !!imagePreview || !!value.trim()) return;
            const dropped = Array.from(e.dataTransfer?.files || []);
            handleFilesInput(dropped);
          }}
        >
          <textarea
            className="text-input"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={imagePreview ? "Image attached successfully, \nready to analyze!" : "Enter content, or drag and drop an image to analyze for trustworthiness..."}
            rows="8"
            disabled={isLoading || !!imagePreview}
          />
          {dragActive && !imagePreview && !value.trim() && (
            <div className="drop-overlay">
              <span>Drop image to analyze</span>
            </div>
          )}
          {imagePreview && (
            <div className="image-preview-overlay">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <div className="input-bottom-row">
          <div className="left-tools">
            <button
              type="button"
              className="icon-pill"
              onClick={handleClickAttach}
              disabled={isLoading || !!imagePreview || !!value.trim()}
            >
              <Paperclip size={18} />
              <span>File</span>
              {files.length > 0 && <span className="badge">{files.length}</span>}
            </button>

            <button
              type="button"
              className={`icon-pill ${showEmojiPicker ? 'active' : ''}`}
              onClick={() => setShowEmojiPicker((s) => !s)}
              disabled={isLoading || !!imagePreview}
            >
              <Smile size={18} />
              <span>Emoji</span>
            </button>

            <button
              type="button"
              className={`icon-pill ${listening ? 'active' : ''}`}
              onClick={handleToggleVoice}
              disabled={isLoading || !!imagePreview}
            >
              <Mic size={18} />
              <span>{listening ? 'Listening...' : 'Voice'}</span>
            </button>
          </div>

          <span className="char-count">
            {value.length} / 10000 characters
          </span>
        </div>

        {showEmojiPicker && (
          <div className="emoji-picker-wrapper">
            <Picker
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme="dark"
            />
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf"
          style={{ display: 'none' }}
          onChange={handleFileSelected}
        />

        

        {files.length > 0 && (
          <div className="selected-files">
            {files.map((file, idx) => (
              <span key={idx} className="file-chip">
                <span className="file-chip-name">
                  {file.name.length > 24 ? file.name.slice(0, 21) + '...' : file.name}
                </span>
                <span className="file-chip-size">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </span>
            ))}
            <button
              type="button"
              className="file-clear-button"
              onClick={handleClearFiles}
              disabled={isLoading}
            >
              Clear files
            </button>
          </div>
        )}

        <button
          type="submit"
          className="analyze-button"
          disabled={
            isLoading || (!value.trim() && files.length === 0) || (value.trim() && value.length < 5)
          }
        >
          {isLoading ? 'Analyzing...' : 'Analyze Content'}
        </button>
      </form>
    </div>
  );
};
export default TextInput;
