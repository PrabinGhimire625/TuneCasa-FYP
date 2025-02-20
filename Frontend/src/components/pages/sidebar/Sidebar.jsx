import React from 'react'
import {assets} from "../../../assets/frontend-assets/assets"
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="bg-black text-white w-1/5 h-screen p-6">
      <nav>

        <Link
          to="/"
          className="flex items-center space-x-3 py-3 px-4 rounded-lg bg-[#121212] hover:bg-[#121212] text-2xl mb-2"
        >
          <img className='w-6' src={assets.home_icon} alt="" />
          <span>Home</span>
        </Link>
        <Link
          to="/explore"
          className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-[#121212]  text-2xl mb-2"
        >
        <img className='w-6' src={assets.explore} alt="" />
          <span>Explore</span>
        </Link>

        <Link
          to="/library"
          className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-[#121212] text-2xl "
        >
          <img className='w-6' src={assets.stack_icon} alt="" />
          <span>Library</span>
        </Link>

        <Link
          to="/library"
          className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-[#121212] text-2xl "
        >
          <img className='w-6' src={assets.stack_icon} alt="" />
          <span>Artist Booking</span>
        </Link>
       
      </nav>

      {/* Divider */}
      <div className="my-6 border-t border-gray-700 mt-16"></div>

      {/* New Playlist */}
      <button className="flex  space-x-3 py-3 px-4 rounded-2xl bg-[#121212] hover:bg-[#121212]   text-2xl ">
        <span className="w-6 h-6 flex items-center justify-center text-white text-2xl">
          +
        </span>
        <span>New Playlist</span>
      </button>

     
    </div>
  );
};

export default Sidebar;
