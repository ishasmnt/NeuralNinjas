import React, { useState } from 'react';
import './Assistant.css';
import ChatBox from '../components/chat/ChatBox';

const Assistant = () => {
  return (
    <div className="assistant-page">
      <div className="assistant-intro">
        <h1>AI Strategy Consultant</h1>
        <p>Ask anything about your performance, like "Which Reel performed best?"</p>
      </div>
      <ChatBox />
    </div>
  );
};

export default Assistant;