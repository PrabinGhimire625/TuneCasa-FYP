import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { FaThumbsUp, FaBookmark, FaSyncAlt } from 'react-icons/fa';
import { listSingleEvent } from '../../../store/eventSlice';

const SingleEvent = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { singleEvent } = useSelector((state) => state.event);

    useEffect(() => {
        if (id) {
            dispatch(listSingleEvent(id));
        }
    }, [dispatch, id]);

    if (!singleEvent) {
        return <div className="text-center text-gray-500">Loading event details...</div>;
    }

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            <div className="relative w-full h-full">
                <div className="relative z-10 p-6 md:p-12 max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                        <div className="w-full lg:w-1/2 rounded-lg overflow-hidden">
                            <img
                                src={singleEvent.image}
                                alt={singleEvent.title}
                                className="w-full h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>

                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <h2 className="text-5xl font-bold text-blue-400 mb-4">{singleEvent.title}</h2>
                           
                            <div className="text-gray-400 mb-6">
                                <span className="block text-sm">Date: {singleEvent.eventDate}</span>
                                <span className="block text-sm">Location: {singleEvent.location}</span>
                            </div>

                            <div className="flex justify-center lg:justify-start gap-6 mb-8">
                                <button className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                                    <FaThumbsUp /> Like
                                </button>
                                <button className="flex items-center gap-2 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                                    <FaBookmark /> Save Event
                                </button>
                            </div>

                            <div className="flex justify-center lg:justify-start mb-8">
                                <button
                                    className="flex items-center gap-2 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                                    onClick={() => dispatch(listSingleEvent(id))}
                                >
                                    <FaSyncAlt /> Refresh Event
                                </button>
                            </div>

                            <div className="text-lg text-gray-300">
                                <h3 className="text-xl font-semibold mb-2">Additional Information:</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Event Type:</strong> {singleEvent.eventType || "Music Concert"}</li>
                                    <li><strong>Artists Performing:</strong> {singleEvent.artists || "Multiple Artists"}</li>
                                    <li><strong>Event Duration:</strong> {singleEvent.eventDuration || "3 hours"}</li>
                                    <li><strong>Event Genre:</strong> {singleEvent.eventGenre || "Pop, Rock, Classical"}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-blue-400 mb-4 my-5">Event Description </h2>
                    <div className="p-6  rounded-lg shadow-lg">
                    <p className="text-lg text-gray-400 mb-6">{singleEvent.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleEvent;
