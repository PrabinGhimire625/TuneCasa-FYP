import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../../../assets/frontend-assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetStatus, userProfile } from '../../../store/authSlice';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Bell } from "lucide-react";
import { fetchAllNotificationsOfSingleUser, markAllNotificationsAsRead } from '../../../store/notificationSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, profile } = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  //notification
  // const { notifications } = useSelector((state) => state.notifications);
  // const unreadCount = notifications.filter((n) => !n.isRead).length;

  // const handleClick = () => {
  //   dispatch(markAllNotificationsAsRead()); // <-- this triggers isRead: true
  // };

  const unreadCount = useSelector((state) => state.notifications.unreadCount);
  console.log(unreadCount, "unreadCount")

  useEffect(() => {
    dispatch(fetchAllNotificationsOfSingleUser());
  }, [dispatch, unreadCount]);

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    setIsLoggedIn(!!localStorageToken || !!token);
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(userProfile());
    }
  }, [dispatch]);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
     dispatch(resetStatus());
    navigate("/login");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <nav className="w-full bg-black text-white font-semibold relative">
      <div className="flex items-center justify-between px-4 md:px-8 h-[70px]">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link to="/">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
            <img src={assets.tunecasaLogo} alt="logo" className="w-full h-full object-cover" />
          </div>
          </Link>
        </div>

        {/* Search input (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            className="w-72 bg-[#121212] p-2 border-white rounded-md text-white text-sm"
          />
          <img className="w-5" src={assets.search_icon} alt="search" />
        </div>

        {/* Desktop Nav / Auth */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/mainSubcription">
                <p className="bg-white text-black text-sm px-4 py-1 rounded-2xl">Explore Premium</p>
              </Link>

              <Link to="/notification" className="relative">
      <p className="flex items-center gap-2">
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </p>
    </Link>

              <div className="relative" ref={dropdownRef}>
                <div
                  className="bg-purple-500 text-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {profile.username ? profile.username.charAt(0).toUpperCase() : 'P'}
                </div>

                <ul
                  className={`absolute right-0 mt-2 bg-black text-white shadow-lg rounded-md overflow-auto max-h-96 z-[1000] text-sm w-48 ${
                    dropdownOpen ? 'block' : 'hidden'
                  }`}
                >
                  
                  <li className="hover:bg-gray-100 hover:text-red-700 px-4 py-2">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="hover:bg-gray-100 hover:text-red-700 px-4 py-2">
                    <Link to="/mainSubcription">Upgrade to Premium</Link>
                  </li>
                  <li className="hover:bg-gray-100 hover:text-red-700 px-4 py-2">
                    <Link to="/setting">Settings</Link>
                  </li>
                  <li className="hover:bg-gray-100 hover:text-red-700 px-4 py-2">
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/register">
                <p className="bg-white text-black text-sm px-4 py-2 rounded-2xl">Signup</p>
              </Link>
              <Link to="/login">
                <button className="bg-white text-black text-sm px-4 py-2 rounded-2xl">Login</button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-black text-white px-6 py-4 space-y-4">
          {isLoggedIn ? (
            <>
              <Link to="/mainSubcription" className="block text-sm">
                Explore Premium
              </Link>
              <Link to="/profile" className="block text-sm">
                Account
              </Link>
              <Link to="/profile" className="block text-sm">
                Profile
              </Link>
              <Link to="/reviews" className="block text-sm">
                Upgrade to Premium
              </Link>
              <Link to="/returns" className="block text-sm">
                Settings
              </Link>
              <button onClick={handleLogout} className="block text-sm text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="block text-sm">
                Signup
              </Link>
              <Link to="/login" className="block text-sm">
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
