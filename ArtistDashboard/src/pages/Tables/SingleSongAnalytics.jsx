import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaUserCircle, FaCalendarAlt, FaPlayCircle } from "react-icons/fa";
import { fetchSingleSongAnalytics } from "../../store/analyticSlice";

const SingleSongAnalytics = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Fetch single song analytics data from the store
  const { singleSongAnalytics, status } = useSelector((state) => state.analytics);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleSongAnalytics(id)); // Fetch song analytics details
    }
  }, [dispatch, id]);

  // Handle Loading and Error states based on `status`
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <span className="text-xl font-semibold text-gray-300 animate-pulse">Loading...</span>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <span className="text-xl font-semibold text-red-400">Failed to load song analytics.</span>
      </div>
    );
  }

  // Format watch time into minutes and seconds
  const formatWatchTime = (watchTime) => {
    const minutes = Math.floor(watchTime / 60);
    const seconds = Math.round(watchTime % 60);
    return `${minutes} min ${seconds} sec`;
  };

  return (
    <div className="flex justify-center items-center h-screen text-white p-6 mt-[-112px]">
      <div className="w-full max-w-4xl bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-700">
        {/* Song Title */}
        <h2 className="text-4xl text-center font-extrabold mb-6 text-blue-400 tracking-wide">
          Song Analytics
        </h2>

        {/* Song Cover & Details */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Song Image */}
          <div className="relative">
            <img
              src={singleSongAnalytics?.image || "https://via.placeholder.com/200"}
              alt="Song Cover"
              className="w-52 h-52 object-cover rounded-xl shadow-lg border-4 border-gray-600"
            />
            <FaPlayCircle className="absolute bottom-2 right-2 text-blue-400 text-5xl cursor-pointer hover:text-blue-500 transition-all duration-200" />
          </div>

          {/* Song Information */}
          <div className="space-y-4 text-gray-300 text-lg">
            <div className="flex items-center gap-3">
              <FaUserCircle className="text-white text-3xl" />
              <span className="text-2xl font-semibold">
                {singleSongAnalytics?.songName || "Unknown Song"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-blue-400" />
              <span>{singleSongAnalytics?.album || "Unknown Album"}</span>
            </div>

            <p className="text-gray-400 italic">
              {singleSongAnalytics?.desc || "No description available"}
            </p>
          </div>
        </div>

        {/* Song Statistics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 text-center">
            <h4 className="text-blue-400 text-xl font-semibold">Total Views</h4>
            <p className="text-2xl font-bold">{singleSongAnalytics?.totalViews || 0}</p>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 text-center">
            <h4 className="text-blue-400 text-xl font-semibold">Watch Time</h4>
            <p className="text-2xl font-bold">{formatWatchTime(singleSongAnalytics?.totalWatchTime || 0)}</p>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700 text-center">
            <h4 className="text-blue-400 text-xl font-semibold">Earnings</h4>
            <p className="text-2xl font-bold text-green-400">
              ${parseFloat(singleSongAnalytics?.totalEarning || 0).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Audio Player */}
        <div className="flex justify-center mt-6">
          <audio controls className="w-full max-w-md bg-gray-900 p-3 rounded-lg shadow-lg">
            <source src={singleSongAnalytics?.file || ""} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
};

export default SingleSongAnalytics;
