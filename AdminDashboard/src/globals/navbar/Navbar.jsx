import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ArtistProfile, setToken } from '../../store/authSlice';
import tunecasaLogo from "../../assets/tunecasaLogo.png";
import { FiLogOut, FiMusic, FiBell, FiUser } from "react-icons/fi";
import { getEventAndMusicNotifications } from '../../store/notificationSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token, profile } = useSelector((state) => state.auth);
    const [isLoggedIn, setIsloggedIn] = useState(false);

    const {unreadCount} = useSelector((state) => state.notifications);
    console.log(unreadCount, "unreadCount")
  
    useEffect(() => {
      dispatch(getEventAndMusicNotifications());
    }, [dispatch]);
  

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        if (localStorageToken) {
            dispatch(setToken(localStorageToken));
        }
        setIsloggedIn(!!localStorageToken || !!token);
    }, [token, dispatch]);

    useEffect(() => {
        dispatch(ArtistProfile());
    }, [dispatch]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsloggedIn(false);
        navigate("/login");
    };

    return (
        <header className="shadow-md bg-gray-800 text-white font-sans relative z-50">
            <section className="md:flex items-center justify-between py-3 lg:px-10 px-4 lg:min-h-[80px] max-lg:min-h-[60px]">
                <Link to="/dashboard" className="flex items-center">
                    <img src={tunecasaLogo} alt="logo" className="w-[60px] h-[60px] rounded-full" />
                    <span className="ml-3 text-xl font-bold">TuneCasa</span>
                </Link>
                
                <div className="relative w-full max-w-md mx-auto">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="w-full bg-gray-800 border border-gray-700 rounded-full py-2 px-4 text-white focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                </div>

                <div className="flex items-center space-x-6">
                    {isLoggedIn && (
                        <>
                         {/* Notifications Icon */}
                         <Link to="/notification" className="relative">
      <p className="flex items-center gap-2">
        <FiBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </p>
    </Link>
                        </>
                    )}

                    {!isLoggedIn ? (
                        <Link to="/login">
                            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">Login</button>
                        </Link>
                    ) : (
                        <button onClick={handleLogout} className="flex items-center p-3 rounded-lg hover:bg-red-600 text-red-400 hover:text-white">
                            <FiLogOut className="mr-3" /> Logout
                        </button>
                    )}
                </div>
            </section>
        </header>
    );
};

export default Navbar;
