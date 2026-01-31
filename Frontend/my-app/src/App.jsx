import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Assistant from "./pages/Assistant";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";   // ✅ ADD THIS LINE

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
