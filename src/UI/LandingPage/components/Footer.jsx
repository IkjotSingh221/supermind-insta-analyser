import React, { useState } from 'react';
import TeamMember from './TeamMember';

const teamMembers = [
  {
    name: 'Alex Chen',
    role: 'Lead Developer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    bio: 'Full-stack developer with 8 years of experience in building scalable applications.'
  },
  {
    name: 'Sarah Johnson',
    role: 'UI/UX Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800',
    bio: 'Creative designer passionate about crafting beautiful and intuitive user experiences.'
  },
  {
    name: 'Michael Torres',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
    bio: 'Strategic thinker with a track record of delivering successful products.'
  },
  {
    name: 'Emma Wilson',
    role: 'Data Scientist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800',
    bio: 'Expert in machine learning and data analytics, focusing on actionable insights.'
  }
];

function Footer() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <footer id='footer' className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Meet Our <span className="text-blue-500">Team</span>
        </h2>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-nowrap gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`transition-all duration-500 ${
                  hoveredIndex !== null ? (
                    hoveredIndex === index 
                      ? 'flex-grow' 
                      : 'flex-shrink w-1/6 opacity-30'
                  ) : 'w-1/4'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <TeamMember 
                  {...member} 
                  isActive={hoveredIndex === index}
                  isDimmed={hoveredIndex !== null && hoveredIndex !== index}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SocialMetrics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;