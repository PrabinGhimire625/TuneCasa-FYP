import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listSingleEvent, updateEvent } from '../../store/eventSlice';
import { STATUS } from '../../globals/components/Status';

const EditEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleEvent, status } = useSelector((state) => state.event); // Corrected to state.event
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    eventDate: "",
    image: null
  });

  useEffect(() => {
    if (id) {
      dispatch(listSingleEvent(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleEvent) {
      setEventData({
        title: singleEvent.title,
        description: singleEvent.description,
        location: singleEvent.location,
        eventDate: singleEvent.eventDate,
        image: singleEvent.image,
      });
    }
  }, [singleEvent]);

  // Handle input changes
  const handleChange = (e) => {
    const { title, files, value } = e.target;
    setEventData({
      ...eventData,
      [title]: title === "image" ? files[0] : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateEvent({ id, eventData })).then(() => {
      if (status === STATUS.SUCCESS) {
        alert("Successfully updated the event");
      } else {
        alert("Failed to update event");
      }
    });
  };

  return (
    <div className="h-screen  flex items-center justify-center">
      <div className="w-full max-w-lg p-6 bg-stone-800 rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start gap-6"
        >
          {/* Profile Image Upload */}
          <div className="flex justify-center">
            <label className="cursor-pointer">
              <img
                className="object-cover rounded-full shadow-lg bg-indigo-50 text-indigo-600 h-40 w-40 md:h-56 md:w-56"
                src={
                  eventData.image && eventData.image instanceof File
                    ? URL.createObjectURL(eventData.image)
                    : singleEvent?.image
                }
                alt="Event"
              />
              <input
                title="image"
                onChange={handleChange}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
          <div className="text-center text-sm text-gray-400">
            <p className="bg-gray-800 px-3 py-1 rounded-full cursor-pointer hover:text-white hover:bg-gray-700 transition">
              Upload Image
            </p>
          </div>

          {/* Title */}
          <div className="w-full">
            <input
              title="title"
              type="text"
              value={eventData.title}
              onChange={handleChange}
              placeholder="Event Title"
              className="text-2xl text-gray-200 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-indigo-400 w-full py-2 px-4"
            />
          </div>

          {/* Description */}
          <div className="w-full">
            <input
              title="description"
              type="text"
              value={eventData.description}
              onChange={handleChange}
              placeholder="Event Description"
              className="text-lg text-gray-200 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-indigo-400 w-full py-2 px-4"
            />
          </div>

          {/* Event Location */}
          <div className="w-full">
            <input
              title="location"
              type="text"
              value={eventData.location}
              onChange={handleChange}
              placeholder="Event Location"
              className="text-lg text-gray-200 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-indigo-400 w-full py-2 px-4"
            />
          </div>

          {/* Event Date */}
          <div className="w-full">
            <input
              title="eventDate"
              type="date"
              value={eventData.eventDate}
              onChange={handleChange}
              className="text-lg text-gray-200 bg-transparent border-b-2 border-gray-600 focus:outline-none focus:border-indigo-400 w-full py-2 px-4"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
