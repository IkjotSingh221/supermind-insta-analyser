// import React from 'react';
// import PropTypes from 'prop-types';

// function TeamMember({ 
//   name, 
//   role, 
//   image, 
//   bio, 
//   isActive = false, 
//   isDimmed = false 
// }) {
//   return (
//     <div className={`relative group transition-all duration-500 ${isDimmed ? 'grayscale' : ''}`}>
//       <div className={`
//         overflow-hidden rounded-xl 
//         transition-all duration-500 
//         ${isActive ? 'shadow-2xl shadow-blue-500/20' : ''}
//       `}>
//         <img
//           src={image}
//           alt={name}
//           className={`
//             w-full h-64 object-cover 
//             transition-all duration-500 
//             ${isActive ? 'scale-110' : 'group-hover:scale-105'}
//           `}
//         />
//         <div className={`
//           absolute inset-0 
//           bg-gradient-to-t from-black/80 via-black/50 to-transparent
//           transition-opacity duration-300
//           ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
//         `}>
//           <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-300">
//             <h3 className="text-xl font-bold mb-1">{name}</h3>
//             <p className="text-sm text-gray-200 mb-2">{role}</p>
//             <p className={`
//               text-sm text-gray-300 
//               transition-all duration-300 
//               ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
//             `}>
//               {bio}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// TeamMember.propTypes = {
//   name: PropTypes.string.isRequired,
//   role: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   bio: PropTypes.string.isRequired,
//   isActive: PropTypes.bool,
//   isDimmed: PropTypes.bool
// };

// export default TeamMember;

import React from 'react';
import PropTypes from 'prop-types';

function TeamMember({ 
  name, 
  role, 
  image, 
  bio, 
  isActive = false, 
  isDimmed = false 
}) {
  return (
    <div className={`relative group transition-all duration-500 ${isDimmed ? 'grayscale' : ''}`}>
      <div className={`
        overflow-hidden rounded-xl 
        transition-all duration-500 
        ${isActive ? 'shadow-2xl shadow-blue-500/20' : ''}
      `}>
        <img
          src={image}
          alt={name}
          className={`
            w-full h-64 object-cover 
            transition-transform duration-300 ease-in-out
            ${isActive ? 'scale-110' : 'group-hover:scale-105'}
          `}
        />
        <div className={`
          absolute inset-0 
          bg-gradient-to-t from-black/80 via-black/50 to-transparent
          transition-opacity duration-300
          ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        `}>
          <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-300">
            <h3 className="text-xl font-bold mb-1">{name}</h3>
            <p className="text-sm text-gray-200 mb-2">{role}</p>
            <p className={`
              text-sm text-gray-300 
              transition-all duration-300 
              ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}>
              {bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

TeamMember.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isDimmed: PropTypes.bool
};

export default TeamMember;
