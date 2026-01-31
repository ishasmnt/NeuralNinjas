import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, FileSpreadsheet, ClipboardList, Sparkles } from 'lucide-react';
import './Onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div className="onboarding-header">
          <Sparkles className="icon-sparkle" size={40} />
          <h1>Unlock Your Personal Insights</h1>
          <p>Generic data tells a story, but <b>your data</b> defines the strategy. A personalized dashboard allows you to audit your specific tone, detect anomalies in your growth, and outperform your niche competitors.</p>
        </div>

        <div className="options-grid">
          {/* Option 1: CSV Upload */}
          <div className="option-box" onClick={() => navigate('/dashboard')}>
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