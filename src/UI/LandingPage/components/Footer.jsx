import React, { useState } from 'react';
import TeamMember from './TeamMember';
import image1 from '../../images/boy1.jpeg';
import image2 from '../../images/boy2.jpeg';
import image3 from '../../images/girl1.jpeg';
import image4 from '../../images/girl2.jpeg';

const teamMembers = [
  {
    name: 'Ikjot Singh',
    role: 'Backend Developer',
    image: image1,
    github: 'https://github.com/IkjotSingh221',
    linkedin: 'https://www.linkedin.com/in/ikjot-singh-415089311/'
  },
  {
    name: 'Prisha Sawhney',
    role: 'Lead Developer',
    image: image4,
    github: 'https://github.com/prishasawhney',
    linkedin: 'https://www.linkedin.com/in/prishasawhney03/'
  },
  {
    name: 'Harshita Khattar',
    role: 'UI/UX Designer',
    image: image3,
    github: 'https://github.com/hkhattar22',
    linkedin: 'https://www.linkedin.com/in/harshita-khattar-4b4774252/'
  },
  {
    name: 'Yatish Garg',
    role: 'UI/UX Designer',
    image: image2,
    github: 'https://github.com/yatishgarg-411',
    linkedin: 'https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile'
  }
];

function Footer() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <footer id="footer" className="bg-gray-900 text-white py-16">
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
                  hoveredIndex !== null
                    ? hoveredIndex === index
                      ? 'flex-grow'
                      : 'flex-shrink w-1/6 opacity-30'
                    : 'w-1/4'
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
          <p>&copy; {new Date().getFullYear()} TrendWiz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
