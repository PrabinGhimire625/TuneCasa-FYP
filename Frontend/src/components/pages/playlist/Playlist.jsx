import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPlaylist } from '../../../store/playlistSlice';
import { STATUS } from '../../../globals/components/enumStatus/Status';
import { useNavigate } from 'react-router-dom';

const Playlist = ({ onClose }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.playlist);
  const navigate = useNavigate();

  // Form state
  const [playlistData, setPlaylistData] = useState({
    title: '',
    description: '',
    privacy: 'public', // default to 'public'
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaylistData({
      ...playlistData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPlaylist(playlistData));

    // Wait for the status to be updated
    if (status === STATUS.SUCCESS) {
      navigate('/');
      onClose(); // Close the form
    } else if (status === STATUS.ERROR) {
      alert('Failed to create playlist. Try again!');
    }
  };

  console.log('The status is : ', status);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-stone-800 p-8 rounded-lg w-[700px]">
        <h2 className="text-2xl font-medium text-white mb-4">New Playlist</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-400 text-sm mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Playlist Name"
              value={playlistData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-400 text-sm mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="A brief description of your playlist"
              value={playlistData.description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="privacy" className="block text-gray-400 text-sm mb-2">
              Privacy
            </label>
            <select
              id="privacy"
              name="privacy"
              className="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={playlistData.privacy}
              onChange={handleChange}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {status === STATUS.LOADING && (
            <div className="text-center text-white mb-4">Creating playlist...</div>
          )}

          {status === STATUS.ERROR && (
            <div className="text-center text-red-500 mb-4">Something went wrong. Try again.</div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-transparent hover:bg-gray-600 text-white font-medium py-2 px-4 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Playlist;
