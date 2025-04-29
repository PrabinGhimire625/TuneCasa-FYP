import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { artistProfile, setToken } from '../../store/authSlice';
import { FiHome, FiPlusCircle, FiMusic, FiBook, FiCalendar, FiClock, FiList } from 'react-icons/fi';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, profile } = useSelector((state) => state.auth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    if (localStorageToken) {
      dispatch(setToken(localStorageToken));
    }
    setIsLoggedIn(!!localStorageToken || !!token);
  }, [token, dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(artistProfile());
    }
  }, [token, dispatch]);

  return (
    <div className="bg-gray-800 min-h-screen w-96 px-6 py-6 flex flex-col">
      {/* Artist Profile Section */}
      <div className="flex justify-center mt-12">
        <Link to="/profile">
          <img
            className="object-cover rounded-full shadow-2xl transition-transform duration-300 hover:scale-125"
            src={
              isLoggedIn && profile?.image
                ? profile.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD116U9ZCk8bEaanCeB5rSCC2uqY5Ka_2_EA&s"
            }
            alt="Artist Profile"
            style={{ height: '120px', width: '120px' }}
          />
        </Link>

      </div>
      <div className="text-center mt-4">
        <h2 className="text-2xl font-bold text-white">{profile?.username}</h2>
        <p className="mt-2 text-gray-500">Bringing my emotions to life through music.</p>
      </div>

      {/* Sidebar Menu */}
      <div className="flex flex-col gap-6 mt-16">
        <SidebarLink to="/dashboard" icon={<FiHome />} label="Dashboard" />
        <SidebarLink to="/add-song" icon={<FiPlusCircle />} label="Add Song" />
        <SidebarLink to="/allSong" icon={<FiList />} label="List Song" />
        <SidebarLink to="/add-album" icon={<FiBook />} label="Add Album" />
        <SidebarLink to="/list-album" icon={<FiList />} label="List Album" />
        <SidebarLink to="/add-event" icon={<FiPlusCircle />} label="Add Event" />
        <SidebarLink to="/upcomingEvents" icon={<FiList />} label="List Event" />
        <SidebarLink to="/songAnalytics" icon={<FiMusic />} label="Song Analytics" />
        <SidebarLink to="/checkoutHistory" icon={<FiClock />} label="Checkout history" />
      </div>
    </div>
  );
};

// Reusable Sidebar Link Component
const SidebarLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-4 p-6 text-white hover:bg-gray-700 rounded-lg shadow-xl transition-transform duration-300 transform hover:scale-110 w-full"
  >
    {icon}
    <p className="font-bold text-xl">{label}</p>
  </Link>
);

// Reusable Social Media Link Component
const SocialMediaLink = ({ href, icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-white transition-colors">
    {icon}
  </a>
);

export default Sidebar;
