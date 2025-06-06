import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { calculateArtistMonthlyEarning, fetchArtistSongAnalytics } from '../../store/analyticSlice';
import { TrendingUp, Clock, Eye, ArrowRight } from 'lucide-react';
import Footer from '../../globals/components/Footer';
import { requestCheckout } from '../../store/checkoutSlice';
import { toast } from 'react-toastify';
import { STATUS } from '../../globals/components/Status';

const SongAnalytics = () => {
  const dispatch = useDispatch();
  const { artistSongAnalytics, artistMonthlyEarning, status } = useSelector((state) => state.analytics);
  const [searchQuery, setSearchQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    dispatch(fetchArtistSongAnalytics());
    dispatch(calculateArtistMonthlyEarning());
  }, [dispatch]);

  const filteredSongs = artistSongAnalytics?.filter((song) =>
    song.songName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("artistSongAnalytics", artistSongAnalytics);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Inside your component or function
    if (artistMonthlyEarning?.totalEarnings >= 1000) {
      dispatch(requestCheckout(artistMonthlyEarning.totalEarnings))
        .then((res) => {
          if (status === STATUS.SUCCESS) {
            toast.success('Checkout request submitted successfully!');
          } else {
            toast.error('Failed to submit checkout request.');
          }
        })
        .catch(() => {
          toast.error('An error occurred during checkout request.');
        });
    } else {
      toast.info('You need at least Rs. 1000 to request a checkout.');
    }
  };


  return (
    <div className="w-full min-h-screen bg-gray-900 text-white px-4 md:px-10 py-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div className="w-full bg-gray-800 px-6 py-6 rounded-2xl shadow-lg flex flex-col">
          <h3 className="text-2xl font-bold mb-2">Monthly Earnings</h3>
          <p className="text-4xl font-extrabold text-green-400 tracking-wider">
            NPR {artistMonthlyEarning?.totalEarnings?.toFixed(2) || '0.00'}
          </p>

          {/* Buttons Row */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            {artistMonthlyEarning?.totalEarnings >= 1000 && (
              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 transition text-white font-semibold px-5 py-2 rounded-lg"
                >
                  Request for checkout
                </button>
              </form>
            )}

            <Link to="/checkoutHistory">
              <button
                className="bg-white hover:bg-white transition text-black font-semibold px-5 py-2 rounded-lg sm:ml-auto"
              >
                View checkout history
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">Your Song Analytics</h2>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search song by name..."
          className="w-full md:w-1/2 px-5 py-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-100"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Songs List */}
      <div className="grid grid-cols-1 gap-5">
        {filteredSongs?.length > 0 ? (
          filteredSongs.map((item) => (
            <Link to={`/singleSongAnalytics/${item._id}`} key={item._id}>
              <div className="flex items-center bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition duration-300 shadow-md group">
                {/* Song Image */}
                <div className="w-16 h-16 bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={item.image || '/default-image.jpg'}
                    alt={item.songName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Song Details */}
                <div className="ml-6 flex-1">
                  <h4 className="text-xl font-semibold">{item.songName}</h4>
                  <div className="text-sm text-gray-400 flex gap-6 mt-1">
                    <span>Views: {item.totalViews}</span>
                    <span>Watch Time: {item.totalWatchTime}s</span>
                  </div>
                </div>

                {/* Arrow Icon */}
                <ArrowRight className="text-gray-400 group-hover:text-white transition" size={24} />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-400">No songs found</p>
        )}
      </div>
    </div>
  );
};

export default SongAnalytics;
