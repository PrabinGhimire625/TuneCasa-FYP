import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/artist-assets/assets';
import { useDispatch, useSelector } from "react-redux";
import { addAlbum } from '../../store/albumSlice';
import { STATUS } from '../../globals/components/Status';
import { listAllGenre } from '../../store/genreSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddAlbum = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status } = useSelector((state) => state.album);
  const { genre } = useSelector((state) => state.genre);

  const [submitted, setSubmitted] = useState(false);

  const [albumData, setAlbumData] = useState({
    image: "",
    name: "",
    desc: "",
    bgColour: "#121212",
    genre: "none"
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setAlbumData({
      ...albumData,
      [name]: name === 'image' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    dispatch(addAlbum(albumData));
  };

  useEffect(() => {
    dispatch(listAllGenre());
  }, [dispatch]);

  useEffect(() => {
    if (submitted) {
      if (status === STATUS.SUCCESS) {
        toast.success("Album added");
        navigate('/list-album');
      } else if (status === STATUS.ERROR) {
        toast.error("Something went wrong");
      }
    }
  }, [status, submitted, navigate]);

  return (
    <div className="flex justify-center bg-gradient-to-br p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg border-2 border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Add New Album</h2>

        {/* Upload Image */}
        <div className="flex flex-col gap-4 mb-6">
          <p className="text-lg text-gray-300">Upload Image</p>
          <input onChange={handleChange} type="file" name='image' id='image' accept='image/*' hidden />
          <label htmlFor="image">
            <img
              src={albumData.image ? URL.createObjectURL(albumData.image) : assets.upload_area}
              className="w-48 h-48 object-cover rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-105"
              alt="Uploaded preview or placeholder"
            />
          </label>
        </div>

        {/* Album Name */}
        <div className="flex flex-col gap-2.5 mb-6">
          <p className="text-lg text-gray-300">Album Name</p>
          <input
            onChange={handleChange}
            name='name'
            className="bg-transparent outline-none border-2 border-gray-600 p-3 w-full text-white placeholder-gray-400 rounded-lg shadow-md focus:border-blue-100"
            placeholder='Type here'
            type="text"
            required
          />
        </div>

        {/* Album Description */}
        <div className="flex flex-col gap-2.5 mb-6">
          <p className="text-lg text-gray-300">Album Description</p>
          <textarea
            onChange={handleChange}
            name='desc'
            className="bg-transparent outline-none border-2 border-gray-600 p-3 w-full text-white placeholder-gray-400 rounded-lg shadow-md focus:border-blue-100"
            placeholder='Type here'
            required
          />
        </div>

        {/* Background Color */}
        <div className="flex flex-col gap-3 mb-6">
          <p className="text-lg text-gray-300">Background Color</p>
          <input
            onChange={handleChange}
            type='color'
            name='bgColour'
            value={albumData.bgColour}
            className="w-16 h-16 p-0 rounded-lg shadow-md focus:ring-2 focus:ring-blue-100 border-2 border-gray-600"
          />
        </div>

        {/* Genre Selection */}
        <div className="flex flex-col gap-2.5 mb-6">
          <p className="text-lg text-gray-300">Genre</p>
          <select
            onChange={handleChange}
            name='genre'
            value={albumData.genre}
            className="bg-gray-900 outline-none border-2 border-gray-600 p-3 w-full text-white placeholder-gray-400 rounded-lg shadow-md focus:border-blue-100"
            required
          >
            <option value="none" disabled>Select a Genre</option>
            {genre.length > 0 ? (
              genre.map((item, index) => (
                <option key={index} value={item?.name}>{item?.name}</option>
              ))
            ) : (
              <option disabled>No genre available</option>
            )}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-200"
        >
          Add Album
        </button>
      </form>
    </div>
  );
};

export default AddAlbum;
