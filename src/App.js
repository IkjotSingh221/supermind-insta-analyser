import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Dashboard from "./UI/dashboard/Dashboard";
import LandingPage from "./UI/LandingPage/LandingPage";
function App() {
  
  return (
    // <Router> 
      <div className="app-container">
        <div className="content-container">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<LandingPage/>}/>
          
          
        </Routes>
        </div>
        
      </div>
  );
}

export default function AppWrapper() {
  return(
    <Router>
      <App/>
    </Router>
  );
}
