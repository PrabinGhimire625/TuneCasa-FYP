import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/artist-assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addEvent, listAllEvent } from '../../store/eventSlice';
import { STATUS } from '../../globals/components/Status';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
  const { status } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  console.log(status)

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    eventDate: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEventData({
      ...eventData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventData.image) {
      toast.warning("Image is required");
      return;
    }
    dispatch(addEvent(eventData));
    if (status === STATUS.SUCCESS) {
      toast.success("Event added");
      navigate("/upcomingEvents")
    } else {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    dispatch(listAllEvent());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-gray-300">
        <h2 className="text-2xl font-semibold text-center text-white">Add Event</h2>
        
        <div className="flex justify-center gap-8">
          {/* Upload image */}
          <div className="flex flex-col items-center gap-4">
            <label htmlFor="image" className="cursor-pointer">
              <img
                src={eventData.image ? URL.createObjectURL(eventData.image) : assets.upload_area}
                className="w-36 h-36 object-cover rounded-lg border-2 border-gray-500 transition-transform hover:scale-105"
                alt="Uploaded Preview"
              />
            </label>
            <input
              onChange={handleChange}
              type="file"
              id="image"
              accept="image/*"
              name="image"
              hidden
            />
            <p className="text-sm text-gray-400">Upload Event Image</p>
          </div>
        </div>

        {/* Event title */}
        <div className="flex flex-col gap-2">
          <label className="text-lg text-white">Event Title</label>
          <input
            onChange={handleChange}
            name="title"
            value={eventData.title}
            className="bg-transparent border-2 border-gray-600 p-3 rounded-lg text-white focus:ring-2 focus:ring-green-600"
            placeholder="Enter Event Title"
            type="text"
            required
          />
        </div>

        {/* Event description */}
        <div className="flex flex-col gap-2">
          <label className="text-lg text-white">Event Description</label>
          <textarea
            onChange={handleChange}
            name="description"
            value={eventData.description}
            className="bg-transparent border-2 border-gray-600 p-3 rounded-lg text-white focus:ring-2 focus:ring-green-600"
            placeholder="Enter Event Description"
            required
          />
        </div>

        {/* Event Date */}
        <div className="flex flex-col gap-2">
          <label className="text-lg text-white">Event Date</label>
          <input
            onChange={handleChange}
            name="eventDate"
            value={eventData.eventDate}
            className="bg-transparent border-2 border-gray-600 p-3 rounded-lg text-white focus:ring-2 focus:ring-green-600"
            type="date"
            required
          />
        </div>

        {/* Event Location */}
        <div className="flex flex-col gap-2">
          <label className="text-lg text-white">Event Location</label>
          <input
            onChange={handleChange}
            name="location"
            value={eventData.location}
            className="bg-transparent border-2 border-gray-600 p-3 rounded-lg text-white focus:ring-2 focus:ring-green-600"
            placeholder="Enter Event Location"
            type="text"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition duration-200 ease-in-out transform hover:scale-105"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
