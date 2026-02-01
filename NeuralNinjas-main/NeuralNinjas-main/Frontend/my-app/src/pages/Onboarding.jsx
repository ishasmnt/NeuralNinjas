import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, FileSpreadsheet, ClipboardList, Sparkles } from 'lucide-react';
import './Onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // In a real app, we would parse CSVs here.
      // For now, we simulate success and flag it in localStorage.
      console.log("Uploaded files:", files);
      const fileNames = Array.from(files).map(f => f.name);
      localStorage.setItem('uploadedCSVs', JSON.stringify(fileNames));

      // Simulate processing delay for effect
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="onboarding-container">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept=".csv"
        multiple
        onChange={handleFileUpload}
      />

      <div className="onboarding-card">
        <div className="onboarding-header">
          <Sparkles className="icon-sparkle" size={40} />
          <h1>Unlock Your Personal Insights</h1>
          <p>Generic data tells a story, but <b>your data</b> defines the strategy. A personalized dashboard allows you to audit your specific tone, detect anomalies in your growth, and outperform your niche competitors.</p>
        </div>

        <div className="options-grid">
          {/* Option 1: CSV Upload */}
          <div className="option-box" onClick={triggerUpload}>
            <div className="option-icon-wrapper blue">
              <FileSpreadsheet size={32} />
            </div>
            <h3>Direct Social Sync</h3>
            <p>Upload your account's CSV export for a 100% accurate, AI-driven audit of your real performance.</p>
            <button className="option-btn">Analyze CSV</button>
          </div>

          {/* Option 2: Questions */}
          <div className="option-box" onClick={() => navigate('/assessment')}>
            <div className="option-icon-wrapper purple">
              <ClipboardList size={32} />
            </div>
            <h3>Guided Assessment</h3>
            <p>No data yet? Answer a strategic question set to generate a predictive dashboard for your goals.</p>
            <button className="option-btn outline">Start Questions</button>
          </div>
        </div>

        <p className="skip-link" onClick={() => navigate('/dashboard')}>
          I'll explore the general dashboard first →
        </p>
      </div>
    </div>
  );
};

export default Onboarding;