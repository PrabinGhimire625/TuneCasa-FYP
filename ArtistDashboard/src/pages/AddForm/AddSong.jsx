import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/artist-assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import { listAllAlbum } from '../../store/albumSlice';
import { addSong } from '../../store/songSlice';
import { STATUS } from '../../globals/components/Status';
import { toast, ToastContainer } from 'react-toastify';
import { listAllGenre } from '../../store/genreSlice';



const AddSong = () => {
  const { albums, status } = useSelector((state) => state.album);
  const { genre } = useSelector((state) => state.genre);
  const dispatch = useDispatch();

  const [songData, setSongData] = useState({
    name: "",
    desc: "",
    image: null,
    audio: null,
    album: "none",
    genre:"none"
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
    if (!songData.audio) {
      toast.warning("audio is required");
      return; 
    }
    if (!songData.image) {
      toast.warning("image is required");
      return; 
    }
    dispatch(addSong(songData));
    if (status === STATUS.SUCCESS) {
      alert("Successfully added the song");
    } else {
      alert("Failed to add the song");
    }
  };
  

  useEffect(() => {
    dispatch(listAllAlbum());
    dispatch(listAllGenre())
  }, [dispatch]);


  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col items-start gap-8 text-gray-600'>
        <div className='flex gap-8'>
          {/* upload song */}
          <div className='flex flex-col gap-4'>
            <p>Upload song</p>
            <input
              onChange={handleChange}
              type="file"
              id='song'
              name='audio'
              accept='audio/*'
              hidden
              
            />
            <label htmlFor="song">
              <img src={songData.audio ? assets.upload_added : assets.upload_song} className='w-24 cursor-pointer' alt="" />
            </label>     
          </div>

          {/* upload image */}
          <div className='flex flex-col gap-4'>
            <p>Upload image</p>
            <input
              onChange={handleChange}
              type="file"
              id='image'
              accept='image/*'
              name='image'
              hidden
            />
            <label htmlFor="image">
              <img src={songData.image ? URL.createObjectURL(songData.image) : assets.upload_area} className='w-24 cursor-pointer' alt="" />
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-2.5'>
          <p>Song name</p>
          <input
            onChange={handleChange}
            name='name'
            value={songData.name}
            className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px]'
            placeholder='Type Here'
            type="text"
            required
          />
        </div>

        <div className='flex flex-col gap-2.5'>
          <p>Song description</p>
          <textarea
            onChange={handleChange}
            name='desc'
            value={songData.desc}
            className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px]'
            placeholder='Type Here'
            required
          />
        </div>

        {/* select album */}
        <div className='flex flex-col gap-2.5'>
          <p>Album</p>
          <select
            onChange={handleChange}
            name='album'
            value={songData.album}
            className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px]'
            required
          >
            <option value="none">Select an Album</option>
            {albums.length > 0 ? (
              albums.map((item, index) => (
                <option key={index} value={item?.name}>{item?.name}</option>
              ))
            ) : (
              <option disabled>No Albums Available</option>
            )}
          </select>
        </div>

        {/* select genre */}
        <div className='flex flex-col gap-2.5'>
          <p>Genre</p>
          <select
            onChange={handleChange}
            name='genre'
            value={songData.genre}
            className='bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[500px]'
            required
          >
            <option value="none">Select an Album</option>
            {genre.length > 0 ? (
              genre.map((item, index) => (
                <option key={index} value={item?.name}>{item?.name}</option>
              ))
            ) : (
              <option disabled>No genre available</option>
            )}
          </select>
        </div>

        <button type='submit' className='text-base bg-black text-white py-2.5 px-14 cursor-pointer'>
          Add
        </button>
      </form>
    </>
  );
};

export default AddSong;
