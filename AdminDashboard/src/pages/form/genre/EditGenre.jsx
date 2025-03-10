import React, { useState, useEffect } from 'react';
import Sidebar from '../../sidebar/Sidebar';
import { STATUS } from '../../../globals/enumStatus/Status';
import { useDispatch, useSelector } from 'react-redux';
import { listSingleGenre, updateGenre } from '../../../store/genreSlice';
import { useParams, useNavigate } from 'react-router-dom';

const EditGenre = () => {
  const { id } = useParams(); // Get the genre ID from the URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, singleGenre } = useSelector((state) => state.genre);

  // State to hold the genre data
  const [genreData, setGenreData] = useState({
    name: '',
    desc: '',
    bgColour: '#000000', // Set a default color
  });

  // Fetch the genre data on initial render or when the ID changes
  useEffect(() => {
    if (id) {
      dispatch(listSingleGenre(id));
    }
  }, [id, dispatch]);

  // Update state with the data fetched from the store
  useEffect(() => {
    if (singleGenre) {
      setGenreData({
        name: singleGenre.name,
        desc: singleGenre.desc || '', // Ensure description is handled if missing
        bgColour: singleGenre.bgColour || '#000000', // Set a fallback background color
      });
    }
  }, [singleGenre]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGenreData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateGenre({id, genreData})); // Dispatch updateGenre with the current genreData

    // Handle response based on the status
    if (status === STATUS.SUCCESS) {
      alert('Successfully updated the genre');
      navigate('/tables'); // Navigate to another page after success
    } else {
      alert('Failed to update the genre!');
    }
  };

  console.log("id is ",id)

  return (
    <>
        <div className="flex flex-col flex-1 overflow-y-auto min-h-screen">
          <div className="p-4">
            <div className="w-full p-6 text-white bg-gray-800 rounded-lg shadow-xl">
              <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Edit Genre</h3>
              <form onSubmit={handleSubmit} className="flex flex-col items-start gap-8 text-gray-600">
                <div className="flex flex-col gap-2.5 text-white">
                  <p>Genre Name</p>
                  <input
                    onChange={handleChange}
                    name="name"
                    value={genreData.name}
                    className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px]"
                    placeholder="Type Here"
                    type="text"
                    required
                  />
                </div>

                <div className="flex flex-col gap-3 text-white">
                  <p>Background Color</p>
                  <input
                    onChange={handleChange}
                    value={genreData.bgColour}
                    type="color"
                    name="bgColour"
                  />
                </div>

                <button
                  type="submit"
                  className="text-base bg-black text-white py-2.5 px-14 cursor-pointer"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>

    </>
  );
};

export default EditGenre;
