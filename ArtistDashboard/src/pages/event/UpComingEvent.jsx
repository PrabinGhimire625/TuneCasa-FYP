import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CountArtistUpcommingEvent, deleteEvent } from '../../store/eventSlice';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';

const UpComingEvent = () => {
  const dispatch = useDispatch();
  const { artistUpcomingEvent } = useSelector((state) => state.event);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(CountArtistUpcommingEvent());
  }, [dispatch]);

  console.log("artistUpcomingEvent", artistUpcomingEvent)
  const handleDelete = (eventId) => {
    dispatch(deleteEvent(eventId))
      .then(() => {
        toast.success('Event deleted successfully 🎉');
        dispatch(CountArtistUpcommingEvent());
      })
      .catch(() => {
        toast.error('Something went wrong');
      });
  };

  const filteredEvents = artistUpcomingEvent?.events?.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper to check if date is past
  const isPastEvent = (eventDate) => new Date(eventDate) < new Date();

  return (
    <div className="px-6 md:px-12 py-10">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <p className="font-bold text-2xl text-white">Upcoming Events</p>

        {/* Search Bar */}
        <div className="flex-grow max-w-sm">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-white rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:bg-gray-700"
          />
        </div>

        {/* Add Event Button */}
        <Link
          to="/add-event"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          + Post Events
        </Link>
      </div>

      {filteredEvents?.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredEvents.map((event) => {
            const isPast = isPastEvent(event.eventDate);

            return (
              <div
                key={event._id}
                className={`flex flex-col md:flex-row items-start rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 p-3 md:p-4 ${
                  isPast ? 'bg-red-900/30 border border-red-500' : 'bg-green-900/30 border border-green-500'
                }`}
              >
                <Link to={`/singleEvent/${event._id}`} className="flex md:flex-row flex-col md:items-start w-full">
                  {/* Event Image */}
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full md:w-40 h-40 object-cover rounded-md mb-3 md:mb-0 md:mr-4"
                  />

                  {/* Event Details */}
                  <div className="flex-1">
                    <h3 className="text-white text-xl font-semibold mb-1">{event.title}</h3>
                    <p className="text-gray-400 text-sm mb-1">
                      📅 {new Date(event.eventDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-300 text-sm mb-1 truncate">{event.description}</p>
                    <p className="text-gray-500 italic text-xs">📍 {event.location}</p>
                  </div>
                </Link>

                {/* Edit/Delete Buttons */}
                <div className="flex gap-2 mt-2 md:mt-0 md:ml-4">
                  <Link to={`/editEvent/${event._id}`} className="text-blue-500 hover:text-blue-700 text-lg">
                    <FiEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="text-red-500 hover:text-red-700 text-lg"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-lg mt-10">
          No matching events found.
        </div>
      )}
    </div>
  );
};

export default UpComingEvent;
