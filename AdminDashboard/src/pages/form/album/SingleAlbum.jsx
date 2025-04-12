import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSongByAlbum } from "../../../store/songSlice";

const SingleAlbum = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { songByAlbum } = useSelector((state) => state.song);

  useEffect(() => {
    if (name) {
      dispatch(fetchAllSongByAlbum(name));
    }
  }, [dispatch, name]);

  const singleAlbum = songByAlbum?.[0];

  return (
    <div className="w-full h-full bg-gradient-to-b from-black via-gray-900 to-black text-white px-6 pb-20">
      {/* Album Header */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-8 mt-10">
        <div className="w-60 h-60 rounded-xl overflow-hidden shadow-lg border border-gray-700">
          <img
            src={singleAlbum?.image || "https://via.placeholder.com/256"}
            alt={singleAlbum?.album}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col text-center md:text-left">
          <p className="text-sm uppercase tracking-widest text-gray-400">Album</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-3 hover:underline">
            {singleAlbum?.album || "Unknown Album"}
          </h1>
          <p className="text-lg text-gray-300">{singleAlbum?.desc || "No description available."}</p>
        </div>
      </div>

      {/* Table Header */}
      <div className="mt-12 grid grid-cols-3 sm:grid-cols-4 text-gray-400 border-b border-gray-700 pb-2 text-sm px-2">
        <span className="col-span-1 flex items-center gap-2">
          <b>#</b> Title
        </span>
        <span className="hidden sm:block">Album</span>
        <span className="hidden sm:block">Duration</span>
        <span></span>
      </div>

      {/* Songs */}
      <div className="mt-4 space-y-2">
        {songByAlbum?.map((song, index) => (
          <div
            key={song._id}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 items-center bg-gray-800 bg-opacity-40 hover:bg-opacity-70 transition-all p-3 rounded-lg group"
          >
            <div className="flex items-center col-span-1">
              <span className="text-gray-400 mr-4 w-5">{index + 1}</span>
              <div className="relative w-12 h-12 bg-gray-600 rounded-md overflow-hidden shadow-md">
                <img
                  className="w-full h-full object-cover"
                  src={song.image || "https://via.placeholder.com/40"}
                  alt={song.name}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xl">
                  ▶
                </div>
              </div>
              <Link
                to={`/singleSong/${song._id}`}
                className="text-white ml-4 hover:underline font-medium"
              >
                {song.name}
              </Link>
            </div>

            <p className="hidden sm:block text-sm text-gray-300">{song.album}</p>
            <p className="hidden sm:block text-sm text-center text-gray-300">{song.duration}</p>
            <div className="text-right">
              <Link
                to={`/singleSong/${song._id}`}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleAlbum;
