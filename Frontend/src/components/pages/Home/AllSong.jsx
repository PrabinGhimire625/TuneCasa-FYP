import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllSong } from "../../../store/songSlice";
import { setCurrentSong, playPause } from "../../../store/playerSlice";
import Player from "../player/Player";

const AllSong = () => {
  const dispatch = useDispatch();
  const { song } = useSelector((state) => state.song);
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const scrollContainer = useRef(null);

  useEffect(() => {
    dispatch(listAllSong());
  }, [dispatch]);

  const scrollLeft = () => {
    scrollContainer.current?.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainer.current?.scrollBy({ left: 500, behavior: "smooth" });
  };

  const handleSelectSong = (songItem) => {
    if (currentSong?._id === songItem._id) {
      dispatch(playPause()); // Toggle play/pause
    } else {
      dispatch(setCurrentSong(songItem)); // Set new song
      dispatch(playPause(true)); // Start playing
    }
  };

  // Group songs into sets of 3
  const groupSongs = (songs, groupSize) => {
    let result = [];
    for (let i = 0; i < songs.length; i += groupSize) {
      result.push(songs.slice(i, i + groupSize));
    }
    return result;
  };

  const groupedSongs = groupSongs(song, 3);

  return (
    <div className="w-full p-4 text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Quick Picks</h3>
        <div className="flex items-center gap-2">
          <button onClick={scrollLeft} className="px-3 py-1 bg-gray-700 rounded-full text-lg">{"<"}</button>
          <button onClick={scrollRight} className="px-3 py-1 bg-gray-700 rounded-full text-lg">{">"}</button>
        </div>
      </div>

      <div ref={scrollContainer} className="overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex gap-16">
          {groupedSongs.map((group, i) => (
            <div key={i} className="flex flex-col gap-6">
              {group.map((songItem, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg">
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
                  <div className="flex flex-col flex-grow">
                    <span className="text-white font-semibold text-base truncate">{songItem.name}</span>
                    <span className="text-gray-400 text-sm truncate">{songItem.artist} • {songItem.album}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Player /> {/* Use Player component here */}
    </div>
  );
};

export default AllSong;
