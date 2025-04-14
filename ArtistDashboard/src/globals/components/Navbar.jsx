import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/artist-assets/assets'
import { artistProfile, resetStatus, setToken } from "../../store/authSlice"
import { Bell } from 'lucide-react';
import { fetchAllNotificationsOfArtist } from '../../store/notificationSlice';


const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, status, profile } = useSelector((state) => state.auth);
    const [isLoggedIn, setIsloggedIn] = useState(false);


    
  const unreadCount = useSelector((state) => state.notifications.unreadCount);
  console.log(unreadCount, "unreadCount")
      useEffect(() => {
        dispatch(fetchAllNotificationsOfArtist());
      }, [dispatch, unreadCount]);



    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(artistProfile()); // Fetch user profile only if the token exists
        }
    }, [dispatch]);


    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        if (localStorageToken) {
            dispatch(setToken(localStorageToken))
        }
        setIsloggedIn(!!localStorageToken || !!token);
    }, [token, dispatch]
    );

    // handle logout
    const handleLogout = async () => {
        localStorage.removeItem('token');
        setIsloggedIn(false);
        dispatch(resetStatus());
        navigate("/login");
    };

    return (
        <>
            <header className="shadow-md font-[sans-serif] tracking-wide relative z-50">
                <section className="md:flex lg:items-center relative py-3 lg:px-10 px-4 lg:min-h-[80px] max-lg:min-h-[60px] bg-gray-800">
                    <a href="#" className="mr-10 max-sm:w-full max-sm:mb-3 shrink-0">
                        <Link to="/dashboard"> <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                            <img
                                src={assets.tunecasaLogo}
                                alt="logo"
                                className="w-full h-full object-cover"
                            />
                        </div></Link>


                    </a>
                    <div className="flex flex-wrap w-full items-center">
                        <div className="relative w-full lg:w-96">
                            <input
                                type="text"
                                placeholder="Search something..."
                                className="w-full bg-gray-800 focus:bg-gray-700 text-white px-6 rounded h-11 border border-gray-600 focus:border-gray-400 outline-none text-sm transition-all placeholder-gray-400"
                            />

                            <div className="absolute mt-1 w-full bg-white border border-gray-200 shadow-md z-50 hidden">
                                <ul>
                                    <li className="px-4 py-2 border-b border-gray-200">Search Result 1</li>
                                    <li className="px-4 py-2 border-b border-gray-200">Search Result 2</li>
                                    <li className="px-4 py-2">No results found</li>
                                </ul>
                            </div>
                        </div>


                        <div className="ml-auto max-lg:mt-4">
                            <ul className="flex items-center gap-4">
                                <li className="relative">
                                    <Link to="/notification" className="flex items-center relative mr-5 mt-2">
                                        <Bell className="w-6 h-6 text-white" />
                                       
                                     {unreadCount >0 && (
                                           <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                          {unreadCount}
                                       </span>
                                     )}


                                    </Link>
                                </li>

                                {!isLoggedIn ? (
                                    <>
                                        <li>
                                            <Link to="/register">
                                                <button className="max-sm:hidden flex items-center justify-center text-[15px] px-4 py-1 font-medium text-black bg-white cursor-pointer rounded-md h-8 hover:bg-gray-200 transition">
                                                    Signup
                                                </button>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/login">
                                                <button className="max-sm:hidden flex items-center justify-center text-[15px] px-4 py-1 font-medium text-black bg-white cursor-pointer rounded-md h-8 hover:bg-gray-200 transition">
                                                    Login
                                                </button>
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="max-sm:hidden flex items-center justify-center text-[15px] px-4 py-1 font-medium text-white bg-red-900 cursor-pointer rounded-md h-8 hover:bg-red-800 transition"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                        <li>
                                            <Link to="/profile">
                                                <div className="relative flex items-center justify-center h-8 w-8 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-700 transition">
                                                    {profile.username ? profile.username.charAt(0).toUpperCase() : 'P'}
                                                </div>
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>



                    </div>


                </section>
            </header>

        </>
    )
}

export default Navbar
