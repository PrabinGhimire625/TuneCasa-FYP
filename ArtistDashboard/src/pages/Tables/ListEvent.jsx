import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { deleteEvent, listAllEvent } from '../../store/eventSlice'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"; 

const ListEvent = () => {
    const dispatch = useDispatch();
    const { event } = useSelector((state) => state.event);

    useEffect(() => {
        dispatch(listAllEvent());
    }, [dispatch]);

    // Ensure we don't modify the Redux state directly by creating a new sorted array
    const sortedEvents = event ? [...event].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    return (
        <div className="p-5 rounded-lg">
            <p className='font-bold text-lg text-white mb-4'>All Event List</p>
            <div className="overflow-x-auto bg-gray-800 rounded-lg">
                <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-5 p-4 border-b border-gray-500 text-sm text-white font-semibold bg-gray-700">
                    <p>Image</p>
                    <p>Title</p>
                    <p>Event Date</p>
                    <p>Location</p>
                    <p>Actions</p>
                </div>

                {sortedEvents.map((item, index) => (
                    <div key={index} className='grid grid-cols-6 sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-4 p-4 border-b border-gray-500 text-white text-sm'>
                        <img className='w-12 h-12 rounded-full object-cover' src={item?.image} alt="Event" />
                        <p className="truncate">{item.title}</p>
                        <p>{item.eventDate}</p>
                        <p>{item.location}</p>
                        <div className="flex items-center gap-4">
                            {/* Delete button */}
                            <button 
                                onClick={() => handleDeleteEvent(item._id)} 
                                className="text-red-500 hover:text-red-700 transition duration-200">
                                <FontAwesomeIcon icon={faTrash} className="text-red-500 w-4 h-4 hover:text-red-700 transition duration-200" />
                            </button>
                            {/* Edit button */}
                            <Link to={`/editEvent/${item._id}`} className="flex items-center justify-center hover:text-blue-400">
                                <FontAwesomeIcon icon={faPen} className="text-white w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListEvent;
