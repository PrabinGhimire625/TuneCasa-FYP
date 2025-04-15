import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSongByGenre } from "../../../store/genreSlice";
import { playPause, setCurrentSong, setSongList } from "../../../store/playerSlice";
import Player from "../player/Player";
import { FaPause, FaPlay } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faPause, faPlay, faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { STATUS } from "../../../globals/components/enumStatus/Status";
import { verifyActiveSubscription } from "../../../store/subscriptionSlice";
import OptionsMenu from "../singleSong/OptionsMenu";

const GenreBasedSong = () => {
  const { genre } = useParams();
  const dispatch = useDispatch();
  const { songByGenre } = useSelector((state) => state.genre);
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const scrollContainer = useRef(null);
    const { status, subscription } = useSelector((state) => state.subscription);   
  
    useEffect(() => {
      dispatch(verifyActiveSubscription());
    }, [dispatch]);
  

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
    <div className="w-full text-white">

      {/* Scrollable Song Container */}
    {/* Scrollable Song Container - Enhanced Layout */}
<div className="space-y-3 mt-6">
  {songColumns.flat().map((item, index) => (
    <div
      key={item._id}
      className="flex justify-between items-center p-3 rounded-lg hover:bg-stone-900 transition-all duration-200 group"
    >
      {/* Left Section */}
      <div className="flex items-center gap-3 w-1/3">
        <span className="w-6 text-center text-sm text-gray-400">{index + 1}</span>
        <div className="relative w-10 h-10 rounded-md overflow-hidden">
          <img className="w-full h-full object-cover" src={item.image} alt="Song Cover" />
          <button
            onClick={() => handleSelectSong(item)}
            className="absolute inset-0 flex items-center justify-center shadow-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {currentSong?._id === item._id && isPlaying ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
        </div>
        <Link to={`/singleSong/${item._id}`}>
          <span className="text-white hover:underline text-sm md:text-base">{item.name}</span>
        </Link>
      </div>

      {/* Middle Section */}
      <div className="hidden sm:flex justify-between items-center text-sm w-1/3 pr-6">
        <Link to={`/singleSong/${item._id}`}>
          <p className="truncate hover:underline">{item?.album || "Unknown Album"}</p>
        </Link>
        <p className="text-sm text-gray-400">{item?.duration || "0:00"}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4 w-1/3 justify-end pr-2 sm:pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <FontAwesomeIcon icon={faThumbsUp} className="cursor-pointer hover:text-white" />
        <FontAwesomeIcon icon={faThumbsDown} className="cursor-pointer hover:text-white" />
        {status === STATUS.SUCCESS && subscription ? (
          <FontAwesomeIcon
            icon={faDownload}
            className="cursor-pointer hover:text-white"
            onClick={() => handleDownload(item)}
          />
        ) : null}
        <OptionsMenu songId={item._id} />
      </div>
    </div>
  ))}
</div>

      {/* <Player /> */}
    </div>
  );
};

export default GenreBasedSong;
