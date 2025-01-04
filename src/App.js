import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Dashboard from "./UI/dashboard/Dashboard";

function App() {
  
  return (
    // <Router> 
      <div className="app-container">
        <div className="content-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          
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
