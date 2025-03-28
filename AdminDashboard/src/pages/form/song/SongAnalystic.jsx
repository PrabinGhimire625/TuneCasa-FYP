import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongDetails } from "../../../store/analyticSlice";
import { deleteSong } from "../../../store/songSlice";
import { Link } from "react-router-dom";

const SongAnalystic = () => {
  const dispatch = useDispatch();
  const { songDetails } = useSelector((state) => state.analytics);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchSongDetails());
  }, [dispatch]);

  // Handle song deletion
  const handleDeleteSong = (songId) => {
    dispatch(deleteSong(songId));
  };

  // Filter songs based on search query
  const filteredSongs = songDetails.filter((song) =>
    song.songName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("songDetails", songDetails);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto min-h-screen bg-gray-800 p-6">
      <div className="w-full p-8 bg-gray-900 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-semibold text-center text-white flex-1">
            All Songs Analytics
          </h3>

          {/* Search Bar */}
          <div className="ml-auto w-64">
            <input
              type="text"
              placeholder="Search for a song..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 text-white bg-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((songItem, index) => (
              <Link to={`/${songItem?._id}`} key={index}>
                <div className="flex items-center bg-gray-900 text-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out p-4">
                  {/* Song Image (Square) */}
                  <div className="w-16 h-16 bg-gray-600 rounded-md overflow-hidden">
                    <img
                      src={songItem?.image || "/default-image.jpg"}
                      alt={songItem?.songName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Song Details */}
                  <div className="ml-4 flex flex-col flex-1">
                    <span className="text-xl font-semibold">{songItem?.songName || "Unknown Hello"}</span>
                    <span className="text-sm text-gray-400">{songItem?.album || "Unknown Album"}</span>
                    <span className="text-xs text-gray-400">Views: {songItem?.totalViews || 0}</span>
                    <span className="text-xs text-gray-400">
                      Total Earning: ${songItem?.totalEarning?.toFixed(2) || 0}
                    </span>
                  </div>

                  {/* Arrow Icon */}
                  <div className="ml-4 flex items-center text-gray-400 hover:text-white transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-400">No songs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongAnalystic;
