import React, { useEffect } from 'react';
import Sidebar from '../../sidebar/Sidebar';
import { deleteGenre, listAllGenre } from '../../../store/genreSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link component

const ListGenre = () => {
  const dispatch = useDispatch();
  const { genre } = useSelector((state) => state.genre);

  useEffect(() => {
    dispatch(listAllGenre());
  }, [dispatch]);

  // delete genre
  const handleDeleteGenre = (genreId) => {
    dispatch(deleteGenre(genreId)); // Dispatches the action
  };

  return (
    <>

        <div className="flex flex-col flex-1 overflow-y-auto min-h-screen">
          <div className="p-4">
            <div className="w-full p-6 text-white bg-gray-900 rounded-lg shadow-xl">
              <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">List all genres</h3>
              <div className="space-y-4">
                {genre.map((genreItem, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg shadow-md transition duration-300 hover:bg-gray-700 cursor-pointer"
                  >
                    {/* Wrap genre item in Link to navigate to editGenre/:id */}
                    <Link
                      to={`/editGenre/${genreItem._id}`}
                      className="flex items-center gap-4 w-full" // Ensure it takes up the full width
                    >
                      {/* Left side small box with dynamic bgColour */}
                      <div
                        className="w-14 h-14 rounded-md"
                        style={{
                          backgroundColor: genreItem?.bgColour, // Set the background color dynamically
                        }}
                      />
                      <div className="flex flex-col flex-grow">
                        <span className="text-white font-semibold text-lg">{genreItem?.name}</span>
                      </div>
                    </Link>
                    <button
                      onClick={() => handleDeleteGenre(genreItem._id)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

    </>
  );
};

export default ListGenre;
