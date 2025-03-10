import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listEventForSpecificArtist } from '../../store/eventSlice';
import { fetchSingleUser } from '../../store/authSlice';

const SingleArtist = () => {
  const { id } = useParams(); // Artist ID from URL
  const dispatch = useDispatch();
  const { eventOfArtist } = useSelector((state) => state.event);
  const { singleUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id));
      dispatch(listEventForSpecificArtist(id));
    }
  }, [dispatch, id]);

  return (
    <div className="w-full h-full">
      {/* Artist Profile Section */}
      <div className="py-10 flex flex-col md:flex-row md:items-end gap-8">
        <div className="ml-5">
          <img
            src={
              singleUser?.user?.image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9nFbCnqa-fAIyStp-cQG9M-LezEqxUz0HYg&s"
            }
            alt={`Profile of ${singleUser?.user?.username}`}
            className="w-40 h-40 rounded-full object-cover border-4 border-gray-700"
          />
        </div>
        <div className="flex flex-col text-white ml-5">
          <p className="text-lg font-semibold">Artist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {singleUser?.user?.username || "Unknown Artist"}
          </h2>
          <h4 className="text-xl text-gray-300">
            {singleUser?.user?.email || "No email available"}
          </h4>
          <p className="text-lg text-gray-400 mt-2">
            {singleUser?.bio || "No bio available"}
          </p>
        </div>
      </div>

      {/* Events Section */}
      <div className="py-10 px-5 bg-gray-900 text-white">
        <h3 className="text-3xl font-bold mb-6">Upcoming Events</h3>
        {eventOfArtist && eventOfArtist.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventOfArtist.map((event) => (
              <div
                key={event.id}
                className="bg-gray-800 p-5 rounded-lg shadow-lg border border-gray-700 flex items-center gap-4"
              >
                <img
                  src={event.image || 'https://via.placeholder.com/150'}
                  alt={event.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h4 className="text-xl font-semibold">{event.title}</h4>
                  <p className="text-gray-300">{event.description}</p>
                  <p className="text-sm text-gray-400 mt-2">Date: {event.eventDate}</p>
                  <p className="text-sm text-gray-400">Location: {event.location}</p>
                </div>
              </div>
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
