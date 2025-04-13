import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistTrendingSong } from '../../store/analyticSlice';
import { Link } from 'react-router-dom';

const TrendingSong = () => {
    const { artistTrendingSong } = useSelector((state) => state.analytics);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchArtistTrendingSong());
    }, [dispatch]);

    if (!artistTrendingSong || artistTrendingSong.length === 0) {
        return <div className="text-white text-center mt-10">No trending songs available.</div>;
    }

    return (
        <div className="mt-12 px-4">
            <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl shadow-2xl border border-gray-700">
                <h3 className="text-3xl font-bold text-white mb-8 tracking-wide flex items-center gap-2">
                    <span>🔥</span> <span>Trending Songs</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                    {artistTrendingSong.map((song, index) => (
                        <Link to="/songAnalytics" key={index}>
                            <div className="bg-gray-800 p-5 rounded-xl text-center hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-700 group">
                                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/10 group-hover:border-blue-100 transition-all duration-300 shadow-inner">
                                    <img
                                        src={song.songImage || "https://via.placeholder.com/150x150?text=🎵"}
                                        alt={song.songName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="mt-4 font-semibold text-white truncate">{song.songName}</p>
                                <p className="text-sm text-gray-400 mt-1">
                                    {song.totalViews.toLocaleString()} views
                                </p>
                                <p className="text-sm text-gray-500 italic truncate mt-1">{song.album}</p>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default TrendingSong;
