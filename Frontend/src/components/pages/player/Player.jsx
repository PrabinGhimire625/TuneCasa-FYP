import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playPause, updateProgress, stopPlayer, playNext, playPrev, setCurrentSong } from "../../../store/playerSlice";
import { assets } from "../../../assets/frontend-assets/assets";

const Player = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, progress, songList } = useSelector((state) => state.player);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.file;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const updateProgressBar = () => {
      dispatch(updateProgress(audioRef.current.currentTime));
    };

    audioRef.current.addEventListener("timeupdate", updateProgressBar);
    audioRef.current.onended = () => {
      dispatch(playNext());
    };

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgressBar);
      audioRef.current.onended = null;
    };
  }, [dispatch]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    dispatch(playPause());
  };

  const handlePrev = () => {
    dispatch(playPrev());  // Just dispatch the action
};


  const handleNext = () => {
    dispatch(playNext());  // Just dispatch the action
};

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white px-4 h-[100px] flex justify-between items-center">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={currentSong.image} alt="Song Cover" />
        <div>
          <p>{currentSong.name}</p>
          <p>{currentSong.desc?.slice(0, 12)}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img className="w-4 cursor-pointer" src={assets.prev_icon} alt="" onClick={handlePrev} />
          {isPlaying ? (
            <img className="w-4 cursor-pointer" src={assets.pause_icon} alt="" onClick={handlePlayPause} />
          ) : (
            <img className="w-4 cursor-pointer" src={assets.play_icon} alt="" onClick={handlePlayPause} />
          )}
          <img className="w-4 cursor-pointer" src={assets.next_icon} alt="" onClick={handleNext} />
        </div>

        <div className="flex items-center gap-5">
          <p>{Math.floor(progress / 60)}:{Math.floor(progress % 60)}</p>
          <div className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
            <hr className="h-1 border-none bg-green-800 rounded-full" style={{ width: `${(progress / currentSong?.duration) * 100}%` }} />
          </div>
          <p>{currentSong.duration}</p>
        </div>
      </div>
    </div>
  );
};

export default Player;
