import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, PieChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };
  return (
    <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Track Your Social Media Performance Like Never Before
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get real-time insights into post engagement and audience behavior
            </p>
            <button 
              onClick={handleClick}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Explore Your Dashboard
            </button>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="bg-white rounded-xl shadow-xl p-6 transform rotate-3 hover:rotate-0 transition-transform">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <LineChart className="h-8 w-8 text-blue-600 mb-2" />
                  <div className="h-32 bg-gradient-to-t from-blue-200 to-blue-100 rounded" />
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <PieChart className="h-8 w-8 text-green-600 mb-2" />
                  <div className="h-32 bg-gradient-to-t from-green-200 to-green-100 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Hero.propTypes = {
//   onExplore: PropTypes.func.isRequired
// };

export default Hero;