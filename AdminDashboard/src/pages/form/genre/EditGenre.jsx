import React, { useState, useEffect } from 'react';
import { STATUS } from '../../../globals/enumStatus/Status';
import { useDispatch, useSelector } from 'react-redux';
import { listSingleGenre, updateGenre } from '../../../store/genreSlice';
import { useParams, useNavigate } from 'react-router-dom';

const EditGenre = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, singleGenre } = useSelector((state) => state.genre);

  const [genreData, setGenreData] = useState({
    name: '',
    desc: '',
    bgColour: '#000000',
  });

  useEffect(() => {
    if (id) dispatch(listSingleGenre(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (singleGenre) {
      setGenreData({
        name: singleGenre.name,
        desc: singleGenre.desc || '',
        bgColour: singleGenre.bgColour || '#000000',
      });
    }
  }, [singleGenre]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGenreData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateGenre({ id, genreData }));

    if (status === STATUS.SUCCESS) {
      alert('Successfully updated the genre!');
      navigate('/tables');
    } else {
      alert('Failed to update the genre!');
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-3xl w-full mx-auto bg-gray-800 rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-3">🎧 Edit Genre</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Genre Name */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Genre Name</label>
            <input
              type="text"
              name="name"
              value={genreData.name}
              onChange={handleChange}
              required
              placeholder="Enter genre name"
              className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Description</label>
            <textarea
              name="desc"
              value={genreData.desc}
              onChange={handleChange}
              placeholder="Short description (optional)"
              rows="4"
              className="bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            ></textarea>
          </div>

          {/* Background Color */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300">Background Color</label>
            <input
              type="color"
              name="bgColour"
              value={genreData.bgColour}
              onChange={handleChange}
              className="w-16 h-10 rounded-md border border-white/20 shadow-inner"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300"
          >
            Update Genre
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditGenre;
