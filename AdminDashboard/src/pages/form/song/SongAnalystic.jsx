import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongDetails } from "../../../store/analyticSlice";
import { deleteSong } from "../../../store/songSlice";
import { Link } from "react-router-dom";

const SongAnalystic = () => {
  const dispatch = useDispatch();
  const { songDetails } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchSongDetails());
  }, [dispatch]);

  // Handle song deletion
  const handleDeleteSong = (songId) => {
    dispatch(deleteSong(songId));
  };

  return (
    <div className="flex flex-col flex-1 overflow-y-auto min-h-screen bg-gray-800 p-6">
      <div className="w-full p-8 bg-gray-900 rounded-lg shadow-xl">
        <h3 className="text-3xl font-semibold mb-6 text-center text-white">All Songs Analytics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {songDetails && songDetails.length > 0 ? (
            songDetails.map((songItem, index) => (
              <Link to={`singleSongAnalytics/${songItem?.songId}`} key={index}>
                <div
                  className="flex flex-col bg-gray-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
                >
                  {/* Song Image */}
                  <div className="relative w-full h-48 bg-gray-600 rounded-t-lg overflow-hidden">
                    <img
                      src={songItem?.image || "/default-image.jpg"}
                      alt={songItem?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Song Details */}
                  <div className="flex flex-col p-4 space-y-2">
                    <span className="text-xl font-semibold">{songItem?.name || "Unknown Song"}</span>
                    <span className="text-sm text-gray-400">{songItem?.album || "Unknown Album"}</span>
                    <span className="text-xs text-gray-400">Views: {songItem?.totalViews || 0}</span>
                    <span className="text-xs text-gray-400">
                      Total Earning: ${songItem?.totalEarning?.toFixed(2) || 0}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between p-4 border-t border-gray-600">
                    {/* Optionally, you could add a delete button */}
                    {/* <button
                      onClick={() => handleDeleteSong(songItem.songId)}
                      className="flex items-center gap-2 text-red-500 hover:text-red-400 transition"
                    >
                      Delete
                    </button> */}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-4">No songs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongAnalystic;
