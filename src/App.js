import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Dashboard from "./UI/dashboard/Dashboard";
import LandingPage from "./UI/LandingPage/LandingPage";
import ChatPage from "./UI/chat/ChatPage";
import LoginPage from "./UI/LandingPage/components/LoginPage";
function App() {

  return (
    // <Router> 
    <div className="app-container">
      <div className="content-container">
        <Routes>
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>

    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
