import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllArtists } from '../../store/artistSlice';
import { STATUS } from '../../globals/enumStatus/Status';

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

    if (!data || data.length === 0) {
        return <div>No artists available</div>;
    }

    return (
        <div className="text-white p-6">
            <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">🔥 Popular Artists</h2>
                </div>
                {/* Use CSS Grid for the layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {data.map((item) => (
                        <div key={item._id} className="flex flex-col items-center space-y-2">
                            {/* Circular Image */}
                            <Link to={`/singleArtist/${item._id}`}>
                                <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-700">
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
