import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSong, listAllSong } from '../../store/songSlice';
import { Link } from 'react-router-dom';

const ListSong = () => {
  const dispatch = useDispatch();
  const { song } = useSelector((state) => state.song);

  useEffect(() => {
    dispatch(listAllSong());
  }, [dispatch]);

  // Delete song
  const handleDeleteSong = (songId) => {
    dispatch(deleteSong(songId)); // Dispatches the action
  };

  return (
    <>
      <div>
        <p className="font-bold text-lg text-white">All Songs List</p>
        <br />
        <div>
          <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100 text-black">
            <b>Image</b>
            <b>Name</b>
            <b>Album</b>
            <b>Duration</b>
            <b>Action</b>
          </div>

          {song && song.length > 0 ? (
            song.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-white text-sm mr-5"
              >
                <img className="w-12" src={item?.image} alt={item?.name || 'Song Image'} />
                <Link to={`/editSong/${item._id}`} className="text-blue-400 hover:underline">
                  <p>{item.name}</p>
                </Link>
                <p>{item.album}</p>
                <p>{item.duration}</p>
                <button
                  onClick={() => handleDeleteSong(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="text-white text-center mt-4">No songs available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ListSong;