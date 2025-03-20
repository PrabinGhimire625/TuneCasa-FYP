import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../../globals/components/enumStatus/Status';
import { fetchAllArtists } from '../../../store/artistSlice';

const DisplayArtist = () => {
    const dispatch = useDispatch();
    
    // Getting the artist data from Redux state
    const { data, status } = useSelector((state) => state.artist);
    
    // Fetch artists on component mount
    useEffect(() => {
        dispatch(fetchAllArtists());
    }, [dispatch]);

    // If artists are being loaded, show a loading message
    if (status === STATUS.LOADING) {
        return <div>Loading artists...</div>;
    }

    // If no artists are available, show a message
    if (!data || data.length === 0) {
        return <div>No artists available</div>;
    }

    return (
        <div className="text-white p-6 my-10">
            <div className="mb-4 w-[1600px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Popular Artists</h2>
                    <Link to="/artistList" className="text-blue-400 hover:underline text-lg">
                        See More →
                    </Link>
                </div>

                {/* Display only the first 8 artists */}
                <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
                    {data.slice(0, 8).map((item) => (
                        <div key={item._id} className="flex flex-col items-center space-y-2">
                            <Link to={`/artistDetails/${item._id}`}>
                                <div className="w-44 h-44 rounded-full overflow-hidden bg-gray-700">
                                    <img
                                        src={item.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9nFbCnqa-fAIyStp-cQG9M-LezEqxUz0HYg&s'}
                                        alt={`Artist ${item.username}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </Link>
                            <h3 className="text-lg font-medium text-center">{item.username}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DisplayArtist;
