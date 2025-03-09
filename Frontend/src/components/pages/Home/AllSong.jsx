import { useDispatch, useSelector } from "react-redux";
import { listAllSong } from "../../../store/songSlice";
import { setCurrentSong, playPause, setSongList } from "../../../store/playerSlice";
import Player from "../player/Player";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const AllSong = () => {
  const dispatch = useDispatch();
  const { song } = useSelector((state) => state.song);
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const scrollContainer = useRef(null);

  useEffect(() => {
    dispatch(listAllSong());
  }, [dispatch]);

  useEffect(() => {
    if (song.length > 0) {
      dispatch(setSongList(song));
    }
  }, [song, dispatch]);

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
      setTimeout(() => dispatch(playPause(true)), 200);
    }
  };

  // Group songs into chunks of 3 (for each column)
  const chunkSize = 3;
  const songColumns = [];
  for (let i = 0; i < song.length; i += chunkSize) {
    songColumns.push(song.slice(i, i + chunkSize));
  }

  return (
    <div className="w-full p-4 text-white">
      {/* Title & Scroll Buttons */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Quick Picks</h3>
        <div className="flex items-center gap-2">
          <button onClick={scrollLeft} className="px-2  rounded-full text-lg text-gray-600 border-2 border-gray-600">{"<"}</button>
          <button onClick={scrollRight} className="px-2  rounded-full text-lg text-gray-600 border-2 border-gray-600">{">"}</button>
        </div>
      </div>

      {/* Scrollable Song Container */}
      <div ref={scrollContainer} className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6">
          {songColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-4">
              {column.map((songItem, i) => (
                <div key={i} className=" p-1 rounded-lg shadow-lg flex items-center gap-4 w-56">
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
                      <Link to={`singleSong/${songItem._id}`}><span className="text-white font-semibold text-sm truncate hover:underline white">{songItem.name}</span></Link>
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

export default AllSong;
