import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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

    }, [dispatch ]);


    // If artists are being loaded, show a loading message
    if (status === STATUS.LOADING) {
        return <div>Loading artists...</div>;
    }

    // If no artists are available, show a message
    if (!data || data.length === 0) {
        return <div>No artists available</div>;
    }

    return (
        <div className="text-white p-6">
            <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Popular Artist</h2>
                  
                </div>
                <div className="flex overflow-auto space-x-4 scrollbar-hide">
                    {data.map((item) => (
                        <div key={item._id} className="flex flex-col items-center space-y-2">
                            {/* Circular Image */}
                           <Link to={`/artistDetails/${item._id}`}>
                           <div className="w-56 h-56 rounded-full overflow-hidden bg-gray-700">
                                {/* Use a fallback image if no image exists */}
                                <img
                                    src={item.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9nFbCnqa-fAIyStp-cQG9M-LezEqxUz0HYg&s'}
                                    alt={`Artist ${item.username}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                           </Link>
                            {/* Artist Name */}
                            <h3 className="text-lg font-medium text-center">{item.username}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      
    );
};

export default DisplayArtist;
