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

  const handleFileSelected = (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;
    updateFiles([...files, ...selected]);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const handleClearFiles = () => {
    updateFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEmojiSelect = (emoji) => {
    onChange(value + emoji.native);
  };

  const handleToggleVoice = () => {
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
        <textarea
          className="text-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste, type, or speak content to analyze for trustworthiness..."
          rows="8"
          disabled={isLoading}
        />

        <div className="input-bottom-row">
          <div className="left-tools">
            <button
              type="button"
              className="icon-pill"
              onClick={handleClickAttach}
              disabled={isLoading}
            >
              <Paperclip size={18} />
              <span>File</span>
              {files.length > 0 && <span className="badge">{files.length}</span>}
            </button>

            <button
              type="button"
              className={`icon-pill ${showEmojiPicker ? 'active' : ''}`}
              onClick={() => setShowEmojiPicker((s) => !s)}
              disabled={isLoading}
            >
              <Smile size={18} />
              <span>Emoji</span>
            </button>

            <button
              type="button"
              className={`icon-pill ${listening ? 'active' : ''}`}
              onClick={handleToggleVoice}
              disabled={isLoading}
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
            isLoading || (!value.trim() && files.length === 0) || value.length < 5
          }
        >
          {isLoading ? 'Analyzing...' : 'Analyze Content'}
        </button>
      </form>
    </div>
  );
};

export default TextInput;
