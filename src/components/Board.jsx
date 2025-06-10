import React from 'react';

// Represents a single square on the Tic-Tac-Toe board
const Square = ({ value, onClick }) => {
  const textColorClass = value === 'X' ? 'text-blue-600' : 'text-red-600';
  return (
    <button
      className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white text-5xl sm:text-6xl lg:text-7xl font-extrabold flex items-center justify-center border-4 border-gray-300 hover:bg-gray-100 transition duration-200 ${textColorClass}`}
      onClick={onClick}
      disabled={value !== null} // Disable if already clicked
    >
      {value}
    </button>
  );
};

export default Square;