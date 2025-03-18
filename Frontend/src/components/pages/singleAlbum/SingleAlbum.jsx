import React, { useEffect } from "react";
import Navbar from "../../../globals/components/navbar/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { assets } from "../../../assets/frontend-assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSongByAlbum } from "../../../store/songSlice";
import { listSingleAlbumByName } from "../../../store/albumSlice";
import { setCurrentSong, playPause, setSongList } from "../../../store/playerSlice";
import Player from "../player/Player";

const SingleAlbum = () => {
  const { name } = useParams();
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { songByAlbum } = useSelector((state) => state.song);
  const { singleAlbum } = useSelector((state) => state.album);
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  

  useEffect(() => {
    if (name) {
      dispatch(fetchAllSongByAlbum(name));
      dispatch(listSingleAlbumByName(name));
    }
  }, [dispatch, name]);

  useEffect(() => {
    if (songByAlbum && songByAlbum.length > 0) {
      dispatch(setSongList(songByAlbum));
    }
  }, [songByAlbum, dispatch]);
  

  console.log("All the song of the single album is ", songByAlbum)

  const handleSelectSong = (songItem) => {
    if (currentSong?._id === songItem._id) {
      dispatch(playPause()); // Toggle play/pause
    } else {
      dispatch(setCurrentSong(songItem)); // Set new song
      dispatch(playPause(true)); // Start playing
    }
  };

  return (
    <div className="w-full h-full">
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <div className="ml-5">
          <img className="w-64 h-64 object-cover" src={singleAlbum?.image || "#"} alt="Album Cover" />
        </div>
        <div className="flex flex-col text-white">
          <p>Playlist</p>
            <h2 onClick={() => navigate(`/album/${singleAlbum.name}`)} className="text-5xl font-bold mb-4 md:text-7xl hover:underline white hover:decoration-2 ">{singleAlbum?.name || "Unknown Album"}</h2>
          <h4>{singleAlbum?.desc || "No description available"}</h4>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p className="hidden sm:block">Album</p>
        <p className="hidden sm:block">Views</p>
        <img className="m-auto w-4 hidden sm:block" src={assets.clock_icon} alt="Clock Icon" />
      </div>

      <hr />

      {songByAlbum?.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <div className="flex items-center">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <div className="relative w-10 h-10 bg-gray-500 rounded-md overflow-hidden">
              <img className="w-full h-full object-cover" src={item.image} alt="Song Cover" />
              <button
                onClick={() => handleSelectSong(item)}
                className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md transition-opacity duration-300 ${
                  currentSong?._id === item._id && isPlaying ? "opacity-100" : "opacity-0 hover:opacity-100"
                }`}
              >
                {currentSong?._id === item._id && isPlaying ? "⏸" : "▶"}
              </button>
            </div>
           <Link to={`/singleSong/${item._id}`}> <span className="text-white ml-3 hover:underline white">{item.name}</span></Link>
          </div>
          <p className="text-[15px] hover:underline">{singleAlbum?.name}</p>
          <p className="text-[15px] hidden sm:block">523454</p>
          <p className="text-[15px] text-center hidden sm:block">{item.duration}</p>
        </div>
      ))}

      <Player />
    </div>
  );
};

export default SingleAlbum;
