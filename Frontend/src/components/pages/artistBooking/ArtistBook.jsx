import React from 'react';
import { Link } from 'react-router-dom';

const ArtistBook = () => {
  return (
    <div className="w-full h-full p-4 md:p-6 bg-gray-800 rounded-lg shadow-lg">

      <div className="flex items-center gap-2 md:gap-3">
        <div className="p-1.5 md:p-2 bg-blue-500 rounded-full">
          <svg
            className="w-4 h-4 md:w-6 md:h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m0 9a9 9 0 110-18 9 9 0 010 18z"
            />
          </svg>
        </div>
        <h2 className="text-xl md:text-2xl font-extrabold text-white">Book The Artist</h2>
      </div>

      {/* Description */}
      <p className="text-gray-300 mt-2 text-sm md:text-base">
        Reserve your favorite artist for an unforgettable event!
      </p>

      <Link to="/displayArtist" className="block w-full">
        <button className="mt-4 md:mt-6 px-4 md:px-6 py-2 md:py-3 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm md:text-base font-bold rounded-lg shadow-md transform transition hover:scale-105 hover:shadow-xl active:scale-95">
          🎤 Book Now
        </button>
      </Link>
    </div>
  );
};

export default ArtistBook;
