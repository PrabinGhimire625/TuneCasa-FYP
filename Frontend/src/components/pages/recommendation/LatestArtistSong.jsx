import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../../../globals/components/enumStatus/Status";
import { setCurrentSong, playPause, setSongList } from "../../../store/playerSlice";
import { getLatestArtist6Song } from "../../../store/songSlice";
import { Link } from "react-router-dom";
import { FaPlay, FaPause } from "react-icons/fa";

const LatestArtistSong = ({ id }) => {
    console.log("ID on the latest artist song ", id);
    const dispatch = useDispatch();
    const { lastestArtist6Song, status } = useSelector((state) => state.song);
    const { currentSong, isPlaying } = useSelector((state) => state.player);

    useEffect(() => {
        if (id) {
            dispatch(getLatestArtist6Song(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (lastestArtist6Song && lastestArtist6Song.length > 0) {
            dispatch(setSongList(lastestArtist6Song));
        }
    }, [lastestArtist6Song, dispatch]);

    const handleSelectSong = (songItem) => {
        if (currentSong?._id === songItem._id) {
            dispatch(playPause());
        } else {
            dispatch(setCurrentSong(songItem));
            setTimeout(() => dispatch(playPause(true)), 200);
        }
    };

    if (status === STATUS.LOADING) {
        return <div className="text-white text-center py-20 text-lg font-medium">Loading...</div>;
    }

    if (status === STATUS.ERROR) {
        return <div className="text-red-500 text-center py-20 text-lg font-medium">Explore more to get recommendation</div>;
    }

    return (
        <div className="text-white px-4 md:px-8 py-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl md:text-2xl font-bold">Recommend for you</h2>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {lastestArtist6Song.slice(0, 6).map((songItem, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center group bg-[#111] rounded-lg overflow-hidden transition duration-300 shadow-md hover:shadow-lg hover:bg-[#1a1a1a]"
                        >
                            {/* Image Container */}
                            <div
                                onClick={() => handleSelectSong(songItem)}
                                className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 overflow-hidden cursor-pointer group transition duration-300"
                            >
                                <img
                                    src={songItem.image}
                                    alt={songItem.name}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div
                                    className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-300 ${currentSong?._id === songItem._id && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                        }`}
                                >
                                    <span className="text-white text-xl">
                                        {currentSong?._id === songItem._id && isPlaying ? <FaPause /> : <FaPlay />}
                                    </span>
                                </div>

                            </div>

                            {/* Song Title */}
                            <Link to={`singleSong/${songItem._id}`} className="w-full px-2">
                                <h3 className="mt-3 text-sm md:text-base font-medium truncate hover:underline text-gray-100 transition duration-300">
                                    {songItem.name}
                                </h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestArtistSong;
