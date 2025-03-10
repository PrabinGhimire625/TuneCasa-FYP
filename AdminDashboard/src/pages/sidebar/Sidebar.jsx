import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChartPie, FaTable, FaCog, FaAngleDown, FaMusic, FaUsers, FaHome } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
import { RiPlayListFill, RiAdvertisementFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { assets } from '../../assets/artist-assets/assets';

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <div className="w-72 bg-gray-800 text-gray-300 min-h-screen p-5 flex flex-col text-lg ">
      {/* User Profile Section */}
      <Link to="/dashboard">
      <div className="flex items-center space-x-3 mb-10 mt-2">
      <img src={assets.Prabin} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
        <div>
          <h3 className="text-lg font-semibold">Pravin Ghimire</h3>
          <p className="text-sm text-green-400">Online</p>
        </div>
      </div>
      </Link>

      {/* Sidebar Menu */}
      <nav className="flex-1">
        <Link to="/dashboard" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
          <FaChartPie className="mr-3" /> Dashboard
        </Link>
        <Link to="/artistRequest" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
          <FaUsers className="mr-3" /> Artist Request
        </Link>
        <Link to="/users" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
          <FaTable className="mr-3" /> User Management
        </Link>
        <Link to="/displayArtist" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
          <FaTable className="mr-3" /> Event Management
        </Link>

        {/* Music Management Dropdown */}
        <div>
          <button
            onClick={() => toggleDropdown("music")}
            className="flex justify-between items-center p-3 w-full rounded-lg hover:bg-gray-700"
          >
            <span className="flex items-center">
              <MdLibraryMusic className="mr-3" /> Music Management
            </span>
            <FaAngleDown className={`transition-transform ${openDropdown === "music" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "music" && (
            <div className="ml-6">
              <Link to="/allSong" className="block p-2 text-sm hover:bg-gray-700 rounded-md">All Songs</Link>
              <Link to="/allAlbum" className="block p-2 text-sm hover:bg-gray-700 rounded-md">All Albums</Link>
              <Link to="/allPlaylist" className="block p-2 text-sm hover:bg-gray-700 rounded-md">All Playlists</Link>
              <Link to="/addGenre" className="block p-2 text-sm hover:bg-gray-700 rounded-md">Add Genre</Link>
              <Link to="/allGenre" className="block p-2 text-sm hover:bg-gray-700 rounded-md">List Genre</Link>
            </div>
          )}
        </div>

        {/* Ads Management Dropdown */}
        <div>
          <button
            onClick={() => toggleDropdown("ads")}
            className="flex justify-between items-center p-3 w-full rounded-lg hover:bg-gray-700"
          >
            <span className="flex items-center">
              <RiAdvertisementFill className="mr-3" /> Ads Management
            </span>
            <FaAngleDown className={`transition-transform ${openDropdown === "ads" ? "rotate-180" : ""}`} />
          </button>
          {openDropdown === "ads" && (
            <div className="ml-6">
              <Link to="/createAds" className="block p-2 text-sm hover:bg-gray-700 rounded-md">Create Ads</Link>
              <Link to="/listAds" className="block p-2 text-sm hover:bg-gray-700 rounded-md">List Ads</Link>
            </div>
          )}
        </div>

        <Link to="/settings" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
          <FaCog className="mr-3" /> Settings
        </Link>
      </nav>

      {/* Logout Button */}
      <button className="flex items-center p-3 rounded-lg hover:bg-red-600 mt-5 text-red-400 hover:text-white">
        <FiLogOut className="mr-3" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
