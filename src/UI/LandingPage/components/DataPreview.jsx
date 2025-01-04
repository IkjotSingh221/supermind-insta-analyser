import React from 'react';

export function DataPreview() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Real-Time Analytics</h2>
          <p className="mt-4 text-xl text-gray-600">See how your content performs across different platforms</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Engagement Overview</h3>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
              alt="Engagement Charts"
              className="rounded-lg"
            />
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Content Performance</h3>
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"
              alt="Performance Analytics"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default DataPreview;