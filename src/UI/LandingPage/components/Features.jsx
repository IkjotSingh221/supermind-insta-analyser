// import React from 'react';
// import { BarChart2, PieChart, Brain, LineChart } from 'lucide-react';

// const features = [
//   {
//     icon: BarChart2,
//     title: 'Engagement Metrics',
//     description: 'Track likes, comments, shares, and overall reach across platforms'
//   },
//   {
//     icon: PieChart,
//     title: 'Post-Type Performance',
//     description: 'Compare performance across different content formats'
//   },
//   {
//     icon: Brain,
//     title: 'AI-Driven Insights',
//     description: 'Get intelligent recommendations to optimize your content'
//   },
//   {
//     icon: LineChart,
//     title: 'Data Visualization',
//     description: 'Beautiful charts and graphs for easy data interpretation'
//   }
// ];

// export function Features() {
//   return (
//     <div className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-gray-900">Powerful Features</h2>
//           <p className="mt-4 text-xl text-gray-600">Everything you need to analyze and improve your social media presence</p>
//         </div>
        
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <div key={index} className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
//               <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Features;
import React, { useState, useEffect } from 'react';
import { BarChart2, PieChart, Brain, LineChart } from 'lucide-react';

const features = [
  {
    icon: BarChart2,
    title: 'Engagement Metrics',
    description: 'Track likes, comments, shares, and overall reach across platforms'
  },
  {
    icon: PieChart,
    title: 'Post-Type Performance',
    description: 'Compare performance across different content formats'
  },
  {
    icon: Brain,
    title: 'AI-Driven Insights',
    description: 'Get intelligent recommendations to optimize your content'
  },
  {
    icon: LineChart,
    title: 'Data Visualization',
    description: 'Beautiful charts and graphs for easy data interpretation'
  }
];

export function Features() {
  const [visibleFeatures, setVisibleFeatures] = useState([]);

  useEffect(() => {
    const featureElements = document.querySelectorAll('.feature');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleFeatures((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    featureElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div id='features' className="py-16 bg-white ">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl mt-4 font-bold text-gray-900">Powerful Features</h2>
          <p className="mt-4 text-xl text-gray-600">
            Everything you need to analyze and improve your social media presence
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`feature p-6 bg-white rounded-xl shadow-md transform transition-transform duration-700 ${
                visibleFeatures.includes(index)
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-10 scale-90'
              }`}
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Features;
