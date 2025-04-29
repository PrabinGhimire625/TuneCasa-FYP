import { useDispatch, useSelector } from "react-redux";
import { listAllSong } from "../../../store/songSlice";
import { setCurrentSong, playPause, setSongList } from "../../../store/playerSlice";
import Player from "../player/Player";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaPause, FaPlay } from "react-icons/fa";

const AllSong = () => {
  const dispatch = useDispatch();
  const { song } = useSelector((state) => state.song);
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const scrollContainer = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    dispatch(listAllSong());
  }, [dispatch]);

  useEffect(() => {
    if (song.length > 0) {
      dispatch(setSongList(song));
    }
  }, [song, dispatch]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollLeft = () => {
    const scrollAmount = windowWidth < 640 ? -200 : -500;
    scrollContainer.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    const scrollAmount = windowWidth < 640 ? 200 : 500;
    scrollContainer.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleSelectSong = (songItem) => {
    if (currentSong?._id === songItem._id) {
      dispatch(playPause());
    } else {
      dispatch(setCurrentSong(songItem));
      setTimeout(() => dispatch(playPause(true)), 200);
    }
  };

  const getChunkSize = () => {
    if (windowWidth < 640) return 2;
    if (windowWidth < 1024) return 3;
    return 4;
  };

  const songColumns = [];
  const chunkSize = getChunkSize();
  for (let i = 0; i < song.length; i += chunkSize) {
    songColumns.push(song.slice(i, i + chunkSize));
  }

  return (
    <div className="max-w-7xl mx-auto text-white px-2 sm:px-4 md:px-8 py-6 sm:py-8 md:py-10">
      <div className="flex justify-between items-center mb-3 sm:mb-4 md:mb-6">
        <h3 className="text-base sm:text-lg md:text-xl font-bold">Quick Picks</h3>
        <div className="flex items-center gap-1">
          <button
            onClick={scrollLeft}
            className="w-6 h-6 text-xs rounded-full text-gray-500 border border-gray-500 hover:text-gray-300 hover:border-gray-300 flex items-center justify-center transition-colors"
          >
            {"<"}
          </button>
          <button
            onClick={scrollRight}
            className="w-6 h-6 text-xs rounded-full text-gray-500 border border-gray-500 hover:text-gray-300 hover:border-gray-300 flex items-center justify-center transition-colors"
          >
            {">"}
          </button>
        </div>
      </div>

      <div ref={scrollContainer} className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 sm:gap-4 md:gap-6 pb-2 sm:pb-4">
          {songColumns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-2 sm:gap-4">
              {column.map((songItem, i) => (
                <div key={i} className="p-2 sm:p-3 rounded-lg shadow-lg flex items-center gap-2 sm:gap-4 w-[140px] sm:w-[180px] md:w-[220px] lg:w-[240px]">
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-500 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={songItem.image}
                      alt={songItem.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <button
                      onClick={() => handleSelectSong(songItem)}
                      className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md transition-opacity duration-300 ${currentSong?._id === songItem._id && isPlaying ? "opacity-100" : "opacity-0 hover:opacity-100"
                        }`}
                    >
                      <span className="text-xs sm:text-sm md:text-base">
                        {currentSong?._id === songItem._id && isPlaying ? <FaPause /> : <FaPlay />}
                      </span>
                    </button>
                  </div>

                  {/* Song Details */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <Link to={`singleSong/${songItem._id}`}>
                      <span className="text-xs sm:text-sm md:text-base font-semibold text-white truncate hover:underline block">
                        {songItem.name}
                      </span>
                    </Link>
                    <span className="text-[10px] sm:text-xs text-gray-400 truncate">
                      • {songItem.desc?.slice(0, 20)}...
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllSong;