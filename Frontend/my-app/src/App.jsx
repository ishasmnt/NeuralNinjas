import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Assistant from './pages/Assistant';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
      
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assistant" element={<Assistant />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;