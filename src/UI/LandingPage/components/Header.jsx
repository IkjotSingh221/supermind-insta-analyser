import React from 'react';
import PropTypes from 'prop-types';
import { BarChart3 } from 'lucide-react';
// import { Link } from 'react-router-dom';


function Header(/*{ onLogin }*/) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">SocialMetrics</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-600 hover:text-blue-600">Home</a>
          <a href="#features" className="text-gray-600 hover:text-blue-600" >Features</a>
          {/* <a href="#" className="text-gray-600 hover:text-blue-600">Pricing</a> */}
          <a href="#footer " className="text-gray-600 hover:text-blue-600">Contact Us</a>
        </div>

        <div className="flex items-center space-x-4">
          {/* <button 
            // onClick={onLogin}
            className="px-4 py-2 text-blue-600 hover:text-blue-700"
          >
            Login
          </button>
          <button 
            // onClick={onLogin}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Up
          </button> */}
        </div>
      </nav>
    </header>
  );
}

// Header.propTypes = {
//   onLogin: PropTypes.func.isRequired
// };

export default Header;