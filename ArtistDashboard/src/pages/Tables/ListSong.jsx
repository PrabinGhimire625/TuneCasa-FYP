import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countArtistSong } from '../../store/songSlice';
import { Link } from 'react-router-dom';

const ListSong = () => {
  const dispatch = useDispatch();
  const { artistSongCount } = useSelector((state) => state.song);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Songs data
  const songs = artistSongCount?.songs || [];

  // Filtered songs based on search query
  const filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Effect to dispatch action to count artist songs
  useEffect(() => {
    dispatch(countArtistSong());
  }, [dispatch]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <p className='font-bold text-2xl text-white'>All Songs</p>

    {/* Search Bar */}
        <div className="flex-grow mx-4 max-w-sm">
          <input
            type="text"
            placeholder="Search Songs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            className="w-full px-4 py-2 text-black rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:bg-gray-700 focus:text-white"
          />
        </div>


        {/* Add Song Button */}
        <Link
          to="/add-song"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200 mr-5"
        >
          + Add Song
        </Link>
      </div>

      {/* No Songs Message */}
      {filteredSongs.length === 0 ? (
        <p className="text-gray-400">No songs available.</p>
      ) : (
        <div className="grid gap-4">
          {/* Render filtered songs */}
          {filteredSongs.map((song) => (
            <div key={song._id} className="flex items-center bg-gray-900 hover:bg-gray-800 transition-all duration-200 text-white p-4 rounded-xl shadow-lg">
              
              {/* Left side with image, name, album, and analytics button */}
              <div className="flex items-center w-full">
                {/* Image */}
                <Link to={`/singleSong/${song._id}`} className="flex items-center w-full">
                  <img
                    src={song.image || 'https://via.placeholder.com/100?text=No+Image'}
                    alt={song.name}
                    className="w-24 h-24 rounded-lg object-cover mr-5 border border-zinc-700"
                  />
                  {/* Info */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold hover:underline">{song.name}</h2>
                    <p className="text-gray-400"><strong>Album:</strong> {song.album}</p>
                  </div>
                </Link>

                {/* Button for analytics (positioned on the left side) */}
                <Link to="/songAnalytics" className="ml-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                    View Analytics
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListSong;
