import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { artistProfile, setToken } from '../../store/authSlice';
import { FiHome, FiMusic, FiPlusCircle, FiBook, FiCalendar, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

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
      dispatch(artistProfile()); // Fetch user profile only if token exists
    }
  }, [token, dispatch]);

  return (
    <div className="bg-gray-800 min-h-screen w-96 px-6 py-6 flex flex-col">
  {/* Artist Profile Section */}
  <div className="flex justify-center mt-12">
    <label className="cursor-pointer">
      <img
        className="object-cover rounded-full shadow-2xl transition-transform duration-300 hover:scale-125"
        src={isLoggedIn && profile?.image ? profile.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD116U9ZCk8bEaanCeB5rSCC2uqY5Ka_2_EA&s"}
        alt="Artist Profile"
        style={{ height: '120px', width: '120px' }}
      />
    </label>
  </div>
  <div className="text-center mt-4">
    <h2 className="text-2xl font-bold text-white">Aria Melody</h2>
    <p className="mt-2 text-gray-500">Bringing my emotions to life through music.</p>
  </div>

  {/* Sidebar Menu */}
  <div className="flex flex-col gap-6 mt-16">
    <SidebarLink to="/dashboard" icon={<FiHome />} label="Dashboard" />
    <SidebarLink to="/add-song" icon={<FiPlusCircle />} label="Add Song" />
    <SidebarLink to="/songAnalytics" icon={<FiMusic />} label="Song Analytics" />
    <SidebarLink to="/add-album" icon={<FiBook />} label="Add Album" />
    <SidebarLink to="/list-event" icon={<FiCalendar />} label="List Event" />
  </div>

  {/* Footer Section */}
  <div className="mt-auto pt-8 pb-4 text-center text-gray-400">
    <div className="flex justify-center gap-6 mb-4">
      <SocialMediaLink href="https://github.com/PrabinGhimire625" icon={<FiGithub />} />
      <SocialMediaLink href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit" icon={<FiTwitter />} />
      <SocialMediaLink href="https://www.linkedin.com/feed/?trk=guest_homepage-basic_google-one-tap-submit" icon={<FiLinkedin />} />
    </div>

    <div className="text-sm">
      <p>Contact Support: support@tunecasa.com</p>
      <p>App Version: 1.0.0</p>
    </div>
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
