import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSongByGenre } from "../../../store/genreSlice";
import { playPause, setCurrentSong, setSongList } from "../../../store/playerSlice";
import Player from "../player/Player";

const GenreBasedSong = () => {
  const { genre } = useParams();
  const dispatch = useDispatch();
  const { songByGenre } = useSelector((state) => state.genre);
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const scrollContainer = useRef(null);

  useEffect(() => {
    dispatch(fetchSongByGenre(genre));
  }, [dispatch, genre]); // ✅ Added `genre` as dependency

  useEffect(() => {
    if (songByGenre && songByGenre.length > 0) {
      dispatch(setSongList(songByGenre));
    }
  }, [songByGenre, dispatch]);

  const scrollLeft = () => {
    scrollContainer.current?.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainer.current?.scrollBy({ left: 500, behavior: "smooth" });
  };

  const handleSelectSong = (songItem) => {
    if (currentSong?._id === songItem._id) {
      dispatch(playPause());
    } else {
      dispatch(setCurrentSong(songItem));
      setTimeout(() => {
        dispatch(playPause(true));
      }, 200);
    }
  };

  // ✅ Group songs into chunks of 3
  const chunkSize = 3;
  const songColumns = [];
  if (songByGenre && songByGenre.length > 0) {
    for (let i = 0; i < songByGenre.length; i += chunkSize) {
      songColumns.push(songByGenre.slice(i, i + chunkSize));
    }
  }

  console.log("SongByGenre", songByGenre);

  return (
    <div className="w-full p-4 text-white">
      {/* Title & Scroll Buttons */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Quick Picks</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="px-2 rounded-full text-lg text-gray-400 border-2 border-gray-600 hover:text-white hover:border-white transition"
          >
            {"<"}
          </button>
          <button
            onClick={scrollRight}
            className="px-2 rounded-full text-lg text-gray-400 border-2 border-gray-600 hover:text-white hover:border-white transition"
          >
            {">"}
          </button>
        </div>
      </div>

      {/* Scrollable Song Container */}
      <div ref={scrollContainer} className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6">
          {songColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-4">
              {column.map((songItem) => (
                <div key={songItem._id} className="p-1 rounded-lg shadow-lg flex items-center gap-4 w-56">
                  {/* Song Image with Play Button */}
                  <div className="relative w-12 h-12 bg-gray-500 rounded-md overflow-hidden">
                    <img src={songItem.image} alt={songItem.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleSelectSong(songItem)}
                      className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md transition-opacity duration-300 ${
                        currentSong?._id === songItem._id && isPlaying ? "opacity-100" : "opacity-0 hover:opacity-100"
                      }`}
                    >
                      {currentSong?._id === songItem._id && isPlaying ? "⏸" : "▶"}
                    </button>
                  </div>

                  {/* Song Details */}
                  <div className="flex flex-col">
                    <Link to={`singleSong/${songItem._id}`} className="hover:underline">
                      <span className="text-white font-semibold text-sm truncate">{songItem.name}</span>
                    </Link>
                    <span className="text-gray-400 text-xs truncate">• {songItem.desc?.slice(0, 20)}...</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Player />
    </div>
  );
};

export default GenreBasedSong;
