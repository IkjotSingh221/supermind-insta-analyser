import React from 'react';

const Button = ({ onClick, text, bgColor, textColor, hoverColor, activeBorder }) => {
  return (
    <button
      onClick={onClick} 
      className={`cursor-pointer flex items-center fill-lime-400 ${bgColor} hover:${hoverColor} active:border active:${activeBorder} rounded-md duration-100 p-2`}
      title="Save"
      style={{ position: 'absolute', right: '10px' }}
    >
      <span className={`${textColor} text-sm font-bold pr-1`}>{text}</span>
    </button>
  );
};

export default Button;
