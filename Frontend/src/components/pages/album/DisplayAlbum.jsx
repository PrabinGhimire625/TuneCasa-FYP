import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS } from '../../../globals/components/enumStatus/Status';
import { listAllAlbum } from '../../../store/albumSlice';

const DisplayAlbum = () => {
  const dispatch = useDispatch();
  const { albums, status } = useSelector((state) => state.album);

  useEffect(() => {
    dispatch(listAllAlbum());
  }, [dispatch]);

  if (status === STATUS.LOADING) {
    return (
      <div className="text-center text-white py-20 text-lg font-medium">
        Loading albums...
      </div>
    );
  }

  if (!albums || albums.length === 0) {
    return (
      <div className="text-center text-white py-20 text-lg font-medium">
        No albums available
      </div>
    );
  }

  return (
    <div className="text-white px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-2xl font-bold">Popular Albums</h2>
          <Link
            to="/allAlbum"
            className="text-gray-400 hover:underline hover:text-gray-300 transition text-base md:text-lg"
          >
            See More →
          </Link>
        </div>

        {/* Album Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {albums.slice(0, 6).map((item) => (
            <div
              key={item._id}
              className="flex flex-col items-center text-center group bg-[#111] rounded-lg overflow-hidden transition duration-300 shadow-md hover:shadow-lg hover:bg-[#1a1a1a]"
            >
              <Link to={`/album/${encodeURIComponent(item.name)}`} className="w-full">
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 overflow-hidden cursor-pointer rounded-md transition duration-300 group">
                  <img
                    src={
                      item.image ||
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9nFbCnqa-fAIyStp-cQG9M-LezEqxUz0HYg&s'
                    }
                    alt={`Album ${item.name}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </Link>
              <h3 className="mt-3 text-sm md:text-base font-medium truncate w-full px-2 text-gray-100 transition duration-300 hover:underline">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayAlbum;
