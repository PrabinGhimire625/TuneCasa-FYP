import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/artist-assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addEvent, listAllEvent } from '../../store/eventSlice';
import { STATUS } from '../../globals/components/Status';

const AddEvent = () => {
  const { status } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    eventDate: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target; // Use name instead of title
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
          alert("Successfully added the event");
        } else {
          alert("Failed to add the event");
        }
  };


  useEffect(() => {
    dispatch(listAllEvent());
  }, [dispatch]);

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col items-start gap-8 text-gray-600'>
        <div className='flex gap-8'>
          {/* Upload image */}
          <div className='flex flex-col gap-4'>
            <p>Upload image</p>
            <input
              onChange={handleChange}
              type="file"
              id='image'
              accept='image/*'
              name='image'  // Fix incorrect title usage
              hidden
            />
            <label htmlFor="image">
              <img
                src={eventData.image ? URL.createObjectURL(eventData.image) : assets.upload_area}
                className='w-24 cursor-pointer'
                alt="Uploaded Preview"
              />
            </label>
          </div>
        </div>

        {/* Event title */}
        <div className='flex flex-col gap-2.5'>
          <p>Event title</p>
          <input
            onChange={handleChange}
            name='title'  // Fix incorrect title usage
            value={eventData.title}
            className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px]'
            placeholder='Type Here'
            type="text"
            required
          />
        </div>

        {/* Event description */}
        <div className='flex flex-col gap-2.5'>
          <p>Event description</p>
          <textarea
            onChange={handleChange}
            name='description'  // Fix incorrect title usage
            value={eventData.description}
            className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px]'
            placeholder='Type Here'
            required
          />
        </div>

        {/* Event Date (Fixed to use date input) */}
        <div className='flex flex-col gap-2.5'>
          <p>Event Date</p>
          <input
            onChange={handleChange}
            name='eventDate' // Fix incorrect title usage
            value={eventData.eventDate}
            className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px]'
            type="date" // Fix: Use date input instead of textarea
            required
          />
        </div>

        {/* Event Location */}
        <div className='flex flex-col gap-2.5'>
          <p>Event Location</p>
          <input
            onChange={handleChange}
            name='location'  // Fix incorrect title usage
            value={eventData.location}
            className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px]'
            placeholder='Type Here'
            type="text"
            required
          />
        </div>

        <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>
          Add
        </button>
      </form>
    </>
  );
};

export default AddEvent;
