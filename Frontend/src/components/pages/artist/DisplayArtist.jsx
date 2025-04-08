import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../../globals/components/enumStatus/Status';
import { fetchAllArtists } from '../../../store/artistSlice';

const DisplayArtist = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.artist);

  useEffect(() => {
    dispatch(fetchAllArtists());
  }, [dispatch]);

  if (status === STATUS.LOADING) {
    return (
      <div className="text-center text-white py-20 text-lg font-medium">
        Loading artists...
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-white py-20 text-lg font-medium">
        No artists available
      </div>
    );
  }

  return (
    <div className="text-white px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Popular Artists</h2>
          <Link
            to="/artistList"
            className="text-gray-400 hover:underline hover:text-gray-300 transition text-base md:text-lg"
          >
            See More →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {data.slice(0, 8).map((item) => (
          <div
          key={item._id}
          className="flex flex-col items-center text-center group w-full"
        >
          <Link to={`/artistDetails/${item._id}`} className="w-full flex justify-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-lg border-2 border-gray-700 group-hover:border-white transition">
              <img
                src={
                  item.image ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9nFbCnqa-fAIyStp-cQG9M-LezEqxUz0HYg&s'
                }
                alt={`Artist ${item.username}`}
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
          <h3 className="mt-2 text-sm md:text-base font-medium truncate text-center">
            {item.username}
          </h3>
        </div>
        
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayArtist;
