import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listEventForSpecificArtist } from '../../store/eventSlice';
import { fetchSingleUser } from '../../store/authSlice';
import { calculateArtistMonthlyEarning, fetchArtistSongAnalytics } from '../../store/analyticSlice';
import { Link } from "react-router-dom";

const SingleArtist = () => {
  const { id } = useParams(); // Artist ID from URL
  const dispatch = useDispatch();
  const { eventOfArtist } = useSelector((state) => state.event);
  const { singleUser } = useSelector((state) => state.auth);
  const { artistSongAnalytics, artistMonthlyEarning } = useSelector((state) => state.analytics);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id));
      dispatch(listEventForSpecificArtist(id));
      dispatch(fetchArtistSongAnalytics(id));
      dispatch(calculateArtistMonthlyEarning(id))
    }
  }, [dispatch, id]);

  console.log("artistSongAnalytics",artistSongAnalytics)
  console.log("artistMonthlyEarning",artistMonthlyEarning)

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-6">
      {/* Artist Profile Section */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-8 p-8 bg-gray-800 rounded-lg shadow-lg">
        <img
          src={singleUser?.user?.image || "https://via.placeholder.com/150"}
          alt={`Profile of ${singleUser?.user?.username}`}
          className="w-44 h-44 rounded-full border-4 border-gray-700 object-cover"
        />
        <div className="text-center md:text-left">
          <p className="text-lg text-gray-400">Artist</p>
          <h2 className="text-4xl md:text-6xl font-bold">{singleUser?.user?.username || "Unknown Artist"}</h2>
          <p className="text-gray-300 mt-2">{singleUser?.bio || "No bio available"}</p>
        </div>
      </div>

      {/* Earnings Section */}
      <div className="mt-10 p-6 bg-gray-800 rounded-lg shadow-lg flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Current Month Earnings</h3>
        <p className="text-4xl font-bold text-green-400">${artistMonthlyEarning?.totalEarnings || "0.00"}</p>
      </div>



        {/* song section */}
      <div className="flex flex-col space-y-4  ml-5">
            <h3 className="text-2xl text-white font-bold mt-5">Most played Song of {singleUser?.user?.username || "Unknown Artist"}</h3>
        {artistSongAnalytics?.length > 0 ? (
          artistSongAnalytics.map((item, index) => (
            <Link to={`/${item._id}`} key={index}>
              <div className="flex items-center bg-gray-900 text-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out p-2">
                
                {/* Song Image (Square) */}
                <div className="w-12 h-12 bg-gray-600 rounded-md overflow-hidden">
                  <img src={item.image || "/default-image.jpg"} alt={item.songName} className="w-full h-full object-cover" />
                </div>

                {/* Song Details */}
                <div className="ml-4 flex flex-col flex-1">
                  <span className="text-xl font-semibold">{item?.songName || "Unknown Song"}</span>
                  {/* <span className="text-sm text-gray-400">{item?.album || "Unknown Album"}</span> */}
                  <span className="text-xs text-gray-400">Views: {item?.totalViews || 0}</span>
                  <span className="text-xs text-gray-400">Watch Time: {item?.totalWatchTime || 0} sec</span>
                  {/* <span className="text-xs text-gray-400">Total Earning: {item?.totalEarning || 0}</span> */}
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

      {/* Events Section */}
      <div className="py-4 px-7 bg-gray-900 text-white">
        <h3 className="text-3xl font-bold mb-6">Upcoming Events</h3>
        {eventOfArtist && eventOfArtist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventOfArtist.map((event) => (
              <Link key={event._id} to={`/singleEvent/${event._id}`}>
                <div className=" p-5 rounded-lg shadow-lg border border-gray-700 flex items-center gap-4">
                  <img
                    src={event.image || 'https://via.placeholder.com/150'}
                    alt={event.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="text-xl font-semibold">{event.title}</h4>
                    <p className="text-sm text-gray-400 mt-2">Date: {event.eventDate}</p>
                    <p className="text-sm text-gray-400">Location: {event.location}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No upcoming events.</p>
        )}
      </div>

    </div>
  );
};

export default SingleArtist;
