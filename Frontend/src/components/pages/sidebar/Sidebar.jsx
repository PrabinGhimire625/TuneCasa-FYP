import React, { useEffect, useState } from 'react';
import { assets } from '../../../assets/frontend-assets/assets';
import { Link } from 'react-router-dom';
import Playlist from '../playlist/Playlist'; // Import the Playlist component
import { useDispatch, useSelector } from 'react-redux';
import { listAllPlaylist } from '../../../store/playlistSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [showPlaylist, setShowPlaylist] = useState(false);
  const { playlist } = useSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(listAllPlaylist());
  }, [dispatch]);

  return (
    <div className="bg-black text-white w-1/5 h-screen p-6 relative">
      <nav>
        <Link
          to="/"
          className="flex items-center space-x-3 py-3 px-4 rounded-lg bg-[#121212] hover:bg-[#121212] text-2xl mb-2"
        >
          <img className="w-6" src={assets.home_icon} alt="" />
          <span>Home</span>
        </Link>
        <Link
          to="/explore"
          className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-[#121212] text-2xl mb-2"
        >
          <img className="w-6" src={assets.explore} alt="" />
          <span>Explore</span>
        </Link>

        <Link
          to="/library"
          className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-[#121212] text-2xl"
        >
          <img className="w-6" src={assets.stack_icon} alt="" />
          <span>Library</span>
        </Link>

        <Link
          to="/artist-booking"
          className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-[#121212] text-2xl"
        >
          <img className="w-6" src={assets.stack_icon} alt="" />
          <span>Artist Booking</span>
        </Link>
      </nav>

      {/* Divider */}
      <div className="my-6 border-t border-gray-700 mt-16"></div>

      {/* New Playlist Button */}
      <button
        className="flex space-x-3 py-3 px-4 rounded-2xl bg-[#121212] hover:bg-[#1a1a1a] text-2xl"
        onClick={() => setShowPlaylist(true)}
      >
        <span className="w-6 h-6 flex items-center justify-center text-white text-2xl">+</span>
        <span>New Playlist</span>
      </button>

      {/* Show Playlist Modal when state is true */}
      {showPlaylist && <Playlist onClose={() => setShowPlaylist(false)} />}

      {/* Display Playlist below the "New Playlist" button */}
      <div className="mt-4 ml-7">
        {playlist && playlist.length > 0 ? (
          <ul>
            {playlist.map((item, index) => (
              <li key={index} className="text-md mb-4">
                {item?.title}
                <p className='text-sm'>hello</p>
                
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xl">No playlists available</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
