import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../../globals/components/enumStatus/Status';
import { fetchAllArtists } from '../../../store/artistSlice';

const ArtistList = () => {
    const dispatch = useDispatch();
    const { data, status } = useSelector((state) => state.artist);
    
    useEffect(() => {
        dispatch(fetchAllArtists());
    }, [dispatch]);

    if (status === STATUS.LOADING) {
        return <div className="text-white text-center py-4">Loading artists...</div>;
    }

    if (!data || data.length === 0) {
        return <div className="text-white text-center py-4">No artists available</div>;
    }

    return (
        <div className="text-white p-6">
            <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Popular Artist</h2>
                </div>
                
                {/* Responsive Grid Container */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {data.map((item) => (
                        <div 
                            key={item._id} 
                            className="flex flex-col items-center space-y-3 transition-transform duration-300 hover:scale-105"
                        >
                            <Link 
                                to={`/artistDetails/${item._id}`}
                                className="w-full aspect-square block"
                            >
                                <div className="w-full aspect-square rounded-full overflow-hidden bg-gray-700 hover:shadow-lg transition-shadow duration-300">
                                    <img
                                        src={item.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9nFbCnqa-fAIyStp-cQG9M-LezEqxUz0HYg&s'}
                                        alt={`Artist ${item.username}`}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                    />
                                </div>
                            </Link>
                            <h3 className="text-lg font-medium text-center truncate w-full">
                                {item.username}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArtistList;