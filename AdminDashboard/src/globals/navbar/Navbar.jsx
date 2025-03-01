import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ArtistProfile, setToken } from '../../store/authSlice';
import tunecasaLogo from "../../assets/tunecasaLogo.png"

const Navbar = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {token,status, profile}=useSelector((state)=>state.auth);
    const [isLoggedIn, setIsloggedIn]=useState(false);

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        if(localStorageToken){
          dispatch(setToken(localStorageToken))
        }
        setIsloggedIn(!!localStorageToken || !!token);
      }, [token,dispatch]);

  useEffect(()=>{
        dispatch(ArtistProfile());
    },[dispatch])
    const firstLetter =   profile?.username?.slice(0, 1) || '';

      // handle logout
    const handleLogout=()=>{
        localStorage.removeItem('token')
        setIsloggedIn(false);
        navigate("/login");
      }
    return (
        <>
            <header className="shadow-md font-[sans-serif] tracking-wide relative z-50">
                <section className="md:flex lg:items-center relative py-3 lg:px-10 px-4  bg-black lg:min-h-[80px] max-lg:min-h-[60px]">
                    <a href="javascript:void(0)" className="mr-10 max-sm:w-full max-sm:mb-3 shrink-0">
                    <img 
                    src={tunecasaLogo} 
                    alt="logo" 
                    className="w-full h-full object-cover" 
                    style={{ width: '70px', height: '70px' }} 
                />
                    </a>
                    <div className="flex flex-wrap w-full items-center">
                        <div className="relative w-full lg:w-96">
                            <input
                                type="text"
                                placeholder="Search something..."
                                className="w-full bg-stone-800 focus:bg-transparent px-6 rounded h-11 text-white text-sm transition-all"
                            />
                        </div>

                        <div className="ml-auto max-lg:mt-4">
                            <ul className="flex items-center">
                                {/* Notification Item */}
                               {
                                isLoggedIn && (
                                    <>
                                     <li className="relative">
                                    <Link to="/arti"
                                        type="button"
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white text-sm font-medium"
                                    >
                                        🔔
                                    </Link>
                                    {/* Optional Notification Badge */}
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                                        1
                                    </span>
                                </li>
                                    </>
                                )
                               }
                                
                                {/* Login or Logout Section */}
                                {
                                    !isLoggedIn ? (
                                        <>
                                            <Link to="/login">
                                                <button className="max-sm:hidden flex items-center justify-center text-sm max-lg:py-3 px-4 font-medium text-black bg-white hover:bg-blue-800 cursor-pointer rounded-md h-8 ml-4">
                                                    Login
                                                </button>
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleLogout}
                                                className="max-sm:hidden flex items-center justify-center text-sm max-lg:py-3 px-4 ml-10 font-medium text-white bg-red-700 hover:bg-red-800 cursor-pointer rounded-md h-8 ml-4"
                                            >
                                                Logout
                                            </button>
                                            <Link to="/profile">
                                                <li className="max-sm:hidden flex items-center text-sm max-lg:py-2 px-3 font-medium text-gray-900 cursor-pointer ml-4">
                                                    <div className="relative ml-3">
                                                        <button
                                                            type="button"
                                                            className="relative flex items-center justify-center h-8 w-8 rounded-full bg-white text-black text-sm font-bold"
                                                        >
                                                            {firstLetter.toUpperCase()}
                                                        </button>
                                                    </div>
                                                </li>
                                            </Link>
                                        </>
                                    )
                                }
                            </ul>
                        </div>


                    </div>
                </section>
            </header>
        </>
    );
};

export default Navbar;
