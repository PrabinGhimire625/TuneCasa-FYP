import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getArtistsUserIsFollowing } from '../../../store/authSlice';

const Following = () => {
    const dispatch = useDispatch();
    const { artistOfUserFollow, countfollowing } = useSelector((state) => state.auth); // Accessing the followed artists

    useEffect(() => {
        dispatch(getArtistsUserIsFollowing()); // Dispatch action to fetch followed artists
    }, [dispatch]);

    console.log("following list", artistOfUserFollow); // Log to verify the artist list
    console.log("following count", countfollowing); // Log to verify the artist list

    return (
        <div className="ml-5">
            <h1 className="my-3 text-white font-bold text-2xl">Following artist</h1>
            <h1 className="my-3 text-white font-bold text-2xl"></h1>
            
            <div className="flex overflow-auto gap-4">
                {artistOfUserFollow && artistOfUserFollow.length > 0 ? (
                    artistOfUserFollow.map((artist) => (
                        <div key={artist._id} className="py-2 px-2 flex flex-col items-center relative hover:bg-neutral-800 transition duration-300">
                            <div className="relative w-32 h-32 rounded-lg overflow-hidden cursor-pointer">
                                <img 
                                    src={artist.userId?.image || "https://via.placeholder.com/150"}  // Fallback to placeholder image
                                    alt={artist.userId?.username || "Artist"}  // Fallback to "Artist" if username is not available
                                    className="w-full h-full object-cover" 
                                />
                                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 text-4xl opacity-0 hover:opacity-100">
                                    ▶
                                </button>
                            </div>
                            <Link to={`/singleArtist/${artist._id}`}>
                                <p className="mt-2 text-white font-medium hover:underline">{artist.userId?.username || "Unknown Artist"}</p> {/* Fallback to "Unknown Artist" */}
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No artists found</p> // Message when no artists are found
                )}
            </div>
        </div>
    );
};

export default Following;
