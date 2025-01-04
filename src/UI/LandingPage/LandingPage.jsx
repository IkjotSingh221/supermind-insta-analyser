import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import DataPreview from './components/DataPreview';
import Footer from './components/Footer';
function LandingPage() {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     navigate('/dashboard');
//   };

  return (
    <div className="min-h-screen bg-white">
      <Header /*onLogin={handleLogin}*/ />
      <main>
        <Hero /*onExplore={handleLogin}*/ />
        <Features />
        <DataPreview />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;