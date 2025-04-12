import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaChartPie, FaTable, FaCog, FaAngleDown, FaMusic, FaUsers, FaHome, FaUserCog, FaMoneyCheckAlt } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
import { RiPlayListFill, RiAdvertisementFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { assets } from '../../assets/artist-assets/assets';
import { FiPieChart, FiUsers, FiSettings, FiTable } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa"; // Importing the arrow icon
import { useDispatch, useSelector } from 'react-redux';
import { ArtistProfile } from "../../store/authSlice";



const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, profile } = useSelector((state) => state.auth);

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(ArtistProfile());
    }
  }, [dispatch]);

  console.log("profile", profile)


  return (
    <div className="w-72 bg-gray-800 text-gray-300 min-h-screen p-5 flex flex-col text-lg ">
      {/* User Profile Section */}
      <Link to="/dashboard">
        <div className="flex items-center space-x-4 mb-10 mt-2">
          <img
            src={profile?.image || assets.Prabin}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover "
          />
          <div>
            <h3 className="text-xl font-semibold capitalize">
              {profile?.username || 'Admin'}
            </h3>
            <p className="text-sm text-green-400 mt-1">Online</p>
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
          <FaUserCog className="mr-3" /> User Management
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
              {/* <Link to="/allSong" className="block p-2 text-sm hover:bg-gray-700 rounded-md"> <FaArrowRight className="ml-3" /> All Songs</Link> */}
              <Link to="/songAnalystic" className="flex items-center p-2 text-sm hover:bg-gray-700 rounded-md">
                <FaArrowRight className="mr-2" />
                Song Analytics
              </Link>
              <Link to="/allAlbum" className="flex items-center p-2 text-sm hover:bg-gray-700 rounded-md">
                <FaArrowRight className="mr-2" />
                All Albums
              </Link>
              <Link to="/allPlaylist" className="flex items-center p-2 text-sm hover:bg-gray-700 rounded-md">
                <FaArrowRight className="mr-2" />
                All Playlists
              </Link>
              <Link to="/addGenre" className="flex items-center p-2 text-sm hover:bg-gray-700 rounded-md">
                <FaArrowRight className="mr-2" />
                Add Genre
              </Link>
              <Link to="/allGenre" className="flex items-center p-2 text-sm hover:bg-gray-700 rounded-md">
                <FaArrowRight className="mr-2" />
                List Genre
              </Link>
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
              <Link to="/createAds" className="flex items-center p-2 text-sm hover:bg-gray-700 rounded-md">
                <FaArrowRight className="mr-2" />
                Create Ads
              </Link>
              <Link to="/listAds" className="flex items-center p-2 text-sm hover:bg-gray-700 rounded-md">
                <FaArrowRight className="mr-2" />
                List Ads
              </Link>

            </div>
          )}
        </div>

        <Link to="/allSubscription" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
          <FaMoneyCheckAlt className="mr-3" /> Manage Subscriptions
        </Link>

        <Link to="/settings" className="flex items-center p-3 rounded-lg hover:bg-gray-700">
          <FaCog className="mr-3" /> Settings
        </Link>
      </nav>

      {/* Logout Button
      <button className="flex items-center p-3 rounded-lg hover:bg-red-600 mt-5 text-red-400 hover:text-white">
        <FiLogOut className="mr-3" /> Logout
      </button> */}
    </div>
  );
};

export default Sidebar;
