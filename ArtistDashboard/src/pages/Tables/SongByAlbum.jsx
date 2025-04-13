import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSongByAlbum } from '../../store/songSlice';
import { Link, useParams } from 'react-router-dom';

const SongByAlbum = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { songByAlbum, error } = useSelector((state) => state.song);

  useEffect(() => {
    if (name) {
      dispatch(fetchAllSongByAlbum(name));
    }
  }, [dispatch, name]);

  const isEmpty = !songByAlbum || songByAlbum.length === 0;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-semibold mb-6 border-b border-gray-700 pb-2">
        Album: <span className="text-green-500">{name}</span>
      </h2>

      {error ? (
        <p className="text-red-500 text-center mt-10">{error}</p>
      ) : isEmpty ? (
        <p className="text-center mt-10 text-gray-400">No songs found for this album.</p>
      ) : (
        <ul className="space-y-4">
          {songByAlbum.map((song, index) => (
            <li key={song._id}>
              <Link
                to="/songAnalytics"
                className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700 shadow-sm hover:bg-gray-700 transition"
              >
                <span className="text-gray-400 text-lg font-semibold w-6">{index + 1}.</span>
                <img
                  src={song.image}
                  alt={song.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{song.name}</h3>
                  <p className="text-sm text-gray-400">
                    🎧 {song.genre} | ⏱ {song.duration}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">{song.desc}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SongByAlbum;
