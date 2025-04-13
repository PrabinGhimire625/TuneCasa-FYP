import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listSingleEvent, updateEvent } from "../../store/eventSlice";
import { STATUS } from "../../globals/components/Status";
import { toast } from "react-toastify";

const EditEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleEvent, status } = useSelector((state) => state.event);

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    location: "",
    eventDate: "",
    image: null,
  });

  useEffect(() => {
    if (id) dispatch(listSingleEvent(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (singleEvent) {
      setEventData({
        title: singleEvent.title || "",
        description: singleEvent.description || "",
        location: singleEvent.location || "",
        eventDate: singleEvent.eventDate?.slice(0, 10) || "",
        image: singleEvent.image || null,
      });
    }
  }, [singleEvent]);

  const handleChange = (e) => {
    const { title, value, files } = e.target;
    setEventData({
      ...eventData,
      [title]: title === "image" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateEvent({ id, eventData })).then(() => {
      if (status === STATUS.SUCCESS) {
        toast.success("Event updated successfully!");
        navigate("/upcomingEvents");

      } else {
        toast.error("Failed to update event.");
      }
    });
  };

  return (
    <div className=" flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Edit Event</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <label className="cursor-pointer group">
              <img
                className="object-cover rounded-lg shadow-lg h-36 w-36 md:h-44 md:w-44 border-4 border-gray-700 transition-transform group-hover:scale-105"
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
              <p className="mt-2 text-gray-400 text-sm group-hover:text-white">
                Click to change image
              </p>
            </label>
          </div>

          {/* Title */}
          <input
            title="title"
            type="text"
            value={eventData.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Description */}
          <input
            title="description"
            type="text"
            value={eventData.description}
            onChange={handleChange}
            placeholder="Event Description"
            className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Location */}
          <input
            title="location"
            type="text"
            value={eventData.location}
            onChange={handleChange}
            placeholder="Event Location"
            className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Event Date */}
          <input
            title="eventDate"
            type="date"
            value={eventData.eventDate}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-300"
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
