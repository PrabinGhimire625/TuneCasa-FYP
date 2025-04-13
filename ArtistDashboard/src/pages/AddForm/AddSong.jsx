import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/artist-assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import { listAllAlbum, listAllAlbumOfArtist } from '../../store/albumSlice';
import { addSong } from '../../store/songSlice';
import { STATUS } from '../../globals/components/Status';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listAllGenre } from '../../store/genreSlice';
import { useNavigate } from 'react-router-dom';

const AddSong = () => {
  const { albumOfArtist, status } = useSelector((state) => state.album);
  const { genre } = useSelector((state) => state.genre);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [songData, setSongData] = useState({
    name: '',
    desc: '',
    image: null,
    audio: null,
    album: 'none',
    genre: 'none',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setSongData({
      ...songData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!songData.audio) return toast.warning('Audio is required');
    if (!songData.image) return toast.warning('Image is required');

    dispatch(addSong(songData));
    if (status === STATUS.SUCCESS) {
      toast.success('Song added successfully!');
      //navigate('/allSong'); // Redirect to the allSong route after successful song addition
    } else {
      toast.error('Something went wrong');
    }
  };


  useEffect(() => {
    dispatch(listAllAlbumOfArtist());
    dispatch(listAllGenre());
  }, [dispatch]);

  return (
    <div className="bg-gray-900 flex justify-center items-center py-10 px-4">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-gray-800 text-white p-8 rounded-2xl shadow-2xl flex flex-col gap-6 border border-gray-700"
      >
        <h2 className="text-3xl font-semibold mb-2 border-b border-gray-600 pb-3">🎵 Add New Song</h2>

        <div className="flex flex-col sm:flex-row gap-6 justify-between">
          {/* Upload Song */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium">Upload Song</p>
            <input
              onChange={handleChange}
              type="file"
              id="song"
              name="audio"
              accept="audio/*"
              hidden
            />
            <label htmlFor="song" className="cursor-pointer">
              <img
                src={songData.audio ? assets.upload_added : assets.upload_song}
                alt=""
                className="w-24 h-24 object-contain border-2 border-dashed border-gray-600 rounded-lg hover:border-green-500 transition"
              />
            </label>
          </div>

          {/* Upload Image */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm font-medium">Upload Image</p>
            <input
              onChange={handleChange}
              type="file"
              id="image"
              accept="image/*"
              name="image"
              hidden
            />
            <label htmlFor="image" className="cursor-pointer">
              <img
                src={songData.image ? URL.createObjectURL(songData.image) : assets.upload_area}
                alt=""
                className="w-24 h-24 object-cover border-2 border-dashed border-gray-600 rounded-lg hover:border-green-500 transition"
              />
            </label>
          </div>
        </div>

        {/* Song Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Song Name</label>
          <input
            onChange={handleChange}
            name="name"
            value={songData.name}
            className="bg-gray-900 text-white rounded-md p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Type song name here"
            type="text"
            required
          />
        </div>

        {/* Song Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            onChange={handleChange}
            name="desc"
            value={songData.desc}
            rows={4}
            className="bg-gray-900 text-white rounded-md p-3 border border-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Write something about the song..."
            required
          />
        </div>

        {/* Album Selection */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Select Album</label>
          <select
            onChange={handleChange}
            name="album"
            value={songData.album}
            className="bg-gray-900 text-white rounded-md p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="none" disabled>
              Select an Album
            </option>
            {albumOfArtist.length > 0 ? (
              albumOfArtist.map((item, index) => (
                <option key={index} value={item?.name}>
                  {item?.name}
                </option>
              ))
            ) : (
              <option disabled>No Albums Available</option>
            )}
          </select>
        </div>

        {/* Genre Selection */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Select Genre</label>
          <select
            onChange={handleChange}
            name="genre"
            value={songData.genre}
            className="bg-gray-900 text-white rounded-md p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="none" disabled>
              Select a Genre
            </option>
            {genre.length > 0 ? (
              genre.map((item, index) => (
                <option key={index} value={item?.name}>
                  {item?.name}
                </option>
              ))
            ) : (
              <option disabled>No Genre Available</option>
            )}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
        >
          Add Song
        </button>
      </form>
    </div>
  );
};

export default AddSong;
