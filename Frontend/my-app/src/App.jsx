import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import AssistantPage from './pages/AssistantPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        {/* If you add a Sidebar or Navbar later, it would go here */}
        <main className="content-area">
          <Routes>
            {/* Setting Dashboard as the default home page */}
            <Route path="/" element={<Dashboard />} />
          
             <Route path="/assistant" element={<AssistantPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;