import React, { useEffect, useState, useRef } from "react";
import { assets } from "../../../assets/frontend-assets/assets";
import { Link } from "react-router-dom";
import Playlist from "../playlist/Playlist";
import { useDispatch, useSelector } from "react-redux";
import { listAllPlaylist } from "../../../store/playlistSlice";
import AllPlaylist from "../playlist/AllPlaylist";
import { CalendarCheck } from "lucide-react"; // Book-related icon

const Sidebar = () => {
  const dispatch = useDispatch();
  const [showPlaylist, setShowPlaylist] = useState(false);
  const { playlist } = useSelector((state) => state.playlist);

  // Sidebar resizable state
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const sidebarRef = useRef(null);

  useEffect(() => {
    dispatch(listAllPlaylist());
  }, [dispatch]);


  const handleMouseDown = () => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Adjust sidebar width based on mouse position
  const handleMouseMove = (e) => {
    if (sidebarRef.current) {
      const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left;
      if (newWidth > 250 && newWidth < 500) {
        setSidebarWidth(newWidth);
      }
    }
  };

  // Stop resizing and clean up event listeners
  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="bg-black text-white h-screen p-6 relative"
        style={{ width: `${sidebarWidth}px`, minWidth: "200px", maxWidth: "500px" }}
      >
        <nav>
          <Link
            to="/"
            className="flex items-center space-x-3 py-3 px-4 rounded-lg bg-[#121212] hover:bg-[#1a1a1a] text-xl mb-2"
          >
            <img className="w-6" src={assets.home_icon} alt="Home" />
            <span>Home</span>
          </Link>
          <Link
            to="/allGenre"
            className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-[#121212] text-xl mb-2"
          >
            <img className="w-6" src={assets.explore} alt="Explore" />
            <span>Explore</span>
          </Link>
          <Link
            to="/library"
            className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-[#121212] text-xl"
          >
            <img className="w-6" src={assets.stack_icon} alt="Library" />
            <span>Library</span>
          </Link>
          <Link
            to="/artistList"
            className="flex items-center space-x-3 py-3 px-4 rounded-lg hover:bg-[#121212] text-xl"
          >
            <CalendarCheck className="w-6 h-6 text-white" />
            <span>Book Artist</span>
          </Link>
        </nav>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700 mt-16"></div>

        {/* New Playlist Button */}
        <button
          className="flex space-x-3 py-3 px-5 rounded-2xl bg-[#121212] hover:bg-[#1a1a1a] text-xl"
          onClick={() => setShowPlaylist(true)}
        >
          <span className="w-6 h-6 flex items-center justify-center text-white text-xl">+</span>
          <span >New Playlist</span>
        </button>

        {/* Show Playlist Modal when state is true */}
        {showPlaylist && <Playlist onClose={() => setShowPlaylist(false)} />}

        {/* Display Playlist */}
        <div>
          <Link to={`/likeSong`}>
            <div className="mt-5 ml-2">
              <h2 className="text-lg font-bold">Liked music</h2>
              <p className="text-gray-400 text-sm mb-2 ml">🎵 Auto playlist</p>
            </div>
          </Link>
          <AllPlaylist />
        </div>
      </div>

      {/* Resizer - a thin vertical bar */}
      <div
        className="w-2 bg-gray-700 hover:bg-gray-400 cursor-ew-resize"
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
};

export default Sidebar;
