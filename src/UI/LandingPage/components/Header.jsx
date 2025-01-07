import React from 'react';

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
        <img
            src="./logo512.png"
            alt="TrendWiz Logo"
            className="h-8 w-8 object-contain" // Ensures consistent dimensions
          />
          <span className="text-xl font-bold text-gray-800">TrendWiz</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
          <a href="#features" className="text-gray-600 hover:text-blue-600" >Features</a>
          <a href="#footer " className="text-gray-600 hover:text-blue-600">Contact Us</a>
        </div>

        <div className="flex items-center space-x-4">
        </div>
      </nav>
    </header>
  );
}

export default Header;