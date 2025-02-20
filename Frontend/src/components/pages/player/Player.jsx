import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playPause, updateProgress, stopPlayer } from "../../../store/playerSlice";
import { assets } from "../../../assets/frontend-assets/assets";

const Player = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, progress } = useSelector((state) => state.player);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.file;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play(); // Play when isPlaying is true
      }
    }
  }, [currentSong, isPlaying]); // Trigger effect when currentSong or isPlaying changes

  useEffect(() => {
    const updateProgressBar = () => {
      dispatch(updateProgress(audioRef.current.currentTime));
    };

    audioRef.current.addEventListener("timeupdate", updateProgressBar);
    audioRef.current.onended = () => dispatch(stopPlayer()); // Stop player when song ends

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgressBar);
      audioRef.current.onended = null; // Cleanup the onended event
    };
  }, [dispatch]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();  // Pause if currently playing
    } else {
      audioRef.current.play();   // Play if currently paused
    }
    dispatch(playPause());  // Toggle play/pause state in Redux store
  };

  if (!currentSong) return null; // Hide player if no song is selected

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
          {isPlaying ? (
            <img className="w-4 cursor-pointer" src={assets.pause_icon} alt="" onClick={handlePlayPause} />
          ) : (
            <img className="w-4 cursor-pointer" src={assets.play_icon} alt="" onClick={handlePlayPause} />
          )}
        </div>
        <div className="flex items-center gap-5">
          <p>{Math.floor(progress / 60)}:{Math.floor(progress % 60)}</p>
          <div className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
            <hr className="h-1 border-none bg-green-800 rounded-full" style={{ width: `${(progress / currentSong?.duration) * 100}%` }} />
          </div>
          <p>{Math.floor(currentSong?.duration / 60)}:{Math.floor(currentSong?.duration % 60)}</p>
        </div>
      </div>
    </div>
  );
};

export default Player;
