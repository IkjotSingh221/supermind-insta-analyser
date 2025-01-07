import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import DataPreview from './components/DataPreview';
import Footer from './components/Footer';
function LandingPage() {


  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <DataPreview />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;