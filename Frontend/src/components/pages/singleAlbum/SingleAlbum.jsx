import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSongByAlbum } from "../../../store/songSlice";
import { listSingleAlbumByName } from "../../../store/albumSlice";
import { setCurrentSong, playPause, setSongList } from "../../../store/playerSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsDown,
  faThumbsUp,
  faDownload,
  faEllipsisV,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { assets } from "../../../assets/frontend-assets/assets";
import { toast } from "react-toastify";
import Footer from "../../../globals/components/footer/Footer";
import OptionsMenu from "../singleSong/OptionsMenu";
import { verifyActiveSubscription } from "../../../store/subscriptionSlice";
import { STATUS } from "../../../globals/components/enumStatus/Status";
import ShareButton from "../share/ShareButton"; // Ensure this is imported correctly

const SingleAlbum = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { songByAlbum } = useSelector((state) => state.song);
  const { singleAlbum } = useSelector((state) => state.album);
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const { status, subscription } = useSelector((state) => state.subscription);   

  useEffect(() => {
    if (name) {
      dispatch(fetchAllSongByAlbum(name));
      dispatch(listSingleAlbumByName(name));
    }
  }, [dispatch, name]);

  useEffect(() => {
    if (songByAlbum?.length > 0) {
      dispatch(setSongList(songByAlbum));
    }
  }, [songByAlbum, dispatch]);

  const handleSelectSong = (songItem) => {
    if (currentSong?._id === songItem._id) {
      dispatch(playPause());
    } else {
      dispatch(setCurrentSong(songItem));
      dispatch(playPause(true));
    }
  };

  const handleDownload = async (song) => {
    try {
      const response = await fetch(song?.file, { mode: "cors" });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${song?.name || "audio"}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download song.");
    }
  };

  useEffect(() => {
    dispatch(verifyActiveSubscription());
  }, [dispatch]);

  const generateShareUrl = (albumName) => {
    return `${window.location.origin}/album/${albumName}`;
  };

  const shareUrl = generateShareUrl(singleAlbum?.name);  // Generate shareable URL for the album

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 md:px-12 lg:px-24 text-white">
      <div className="max-w-screen-xl mx-auto py-10">
        {/* Album Header */}
        <div className="flex flex-col p-5 md:flex-row items-center gap-8 mb-12 shadow-[0_0_10px_2px_rgba(255,255,255,0.1)]">
          <img
            className="w-full max-w-xs md:w-64 md:h-64 rounded-xl object-cover shadow-lg"
            src={singleAlbum?.image || "#"}
            alt="Album Cover"
          />
          <div className="flex flex-col text-center md:text-left">
            <span className="text-gray-400 uppercase text-sm tracking-widest">Album</span>
            <h1
              onClick={() => navigate(`/album/${singleAlbum?.name}`)}
              className="text-4xl md:text-6xl font-bold hover:underline decoration-2 cursor-pointer mt-2"
            >
              {singleAlbum?.name || "Unknown Album"}
            </h1>
            <p className="text-gray-400 mt-4 max-w-xl">{singleAlbum?.desc || "No description available"}</p>
          </div>
          <ShareButton url={shareUrl} />  {/* Pass the generated URL to ShareButton */}
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-3 sm:grid-cols-4 text-sm text-gray-400 py-2 border-b border-gray-700 mb-4 font-semibold sticky top-0 bg-opacity-90 z-10">
          <p className="pl-2">
            <b className="mr-2">#</b>Title
          </p>
          <p className="hidden sm:block ml-32">Album</p>
          <img className="m-auto w-4 hidden sm:block" src={assets.clock_icon} alt="Clock Icon" />
        </div>

        {/* Song List */}
        <div className="space-y-2">
          {songByAlbum?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 rounded-lg  hover:bg-stone-900  transition-all duration-200 group"
            >
              {/* Left Section */}
              <div className="flex items-center gap-3 w-1/3">
                <span className="w-6 text-center text-sm text-gray-400">{index + 1}</span>
                <div className="relative w-10 h-10 rounded-md overflow-hidden">
                  <img className="w-full h-full object-cover" src={item.image} alt="Song Cover" />
                  <button
                    onClick={() => handleSelectSong(item)}
                    className="absolute inset-0 flex items-center justify-center shadow-lg  text-white opacity-0 group-hover:opacity-100 transition-opacity"
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
                <Link to={`/singleSong/${item._id}`}><p className="truncate hover:underline">{singleAlbum?.name}</p></Link>
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
      </div>
      <Footer />
    </div>
  );
};

export default SingleAlbum;
