import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  playPause,
  updateProgress,
  playPrev,
  handlePlayNext, // Now using thunk
  getAdsForFreeUsers,
  playAd,
  stopAd,
} from "../../../store/playerSlice";
import { assets } from "../../../assets/frontend-assets/assets";

const Player = () => {
  const dispatch = useDispatch();
  const {
    currentSong,
    isPlaying,
    progress,
    songList,
    currentAd,
    isAdPlaying,
    songCounter, // Updated from songCount
  } = useSelector((state) => state.player);

  const audioRef = useRef(new Audio());
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!currentSong) return;

    if (audioRef.current.src !== currentSong.file) {
      audioRef.current.pause();
      audioRef.current.src = currentSong.file;
      audioRef.current.load();
    }

    audioRef.current.onloadeddata = () => {
      if (isPlaying) {
        audioRef.current.play();
      }
    };
  }, [currentSong]);

  useEffect(() => {
    const updateProgressBar = () => {
      dispatch(updateProgress(audioRef.current.currentTime));
    };

    audioRef.current.addEventListener("timeupdate", updateProgressBar);

    audioRef.current.onended = async () => {
      if (isAdPlaying) {
        dispatch(stopAd());
        dispatch(handlePlayNext());
      } else {
        dispatch(handlePlayNext());
      }
    };

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgressBar);
      audioRef.current.onended = null;
    };
  }, [dispatch, isAdPlaying]);

  useEffect(() => {
    if (currentAd && currentAd.file) {
      audioRef.current.pause();
      audioRef.current.src = currentAd.file;
      audioRef.current.load();

      audioRef.current.play()
        .then(() => dispatch(playAd()))
        .catch((error) => console.error("Error playing ad:", error));

      audioRef.current.onended = () => {
        dispatch(stopAd());
        dispatch(handlePlayNext());
      };
    }
  }, [currentAd]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const handlePlayPause = async () => {
    if (!currentSong) return;

    if (isPlaying) {
      dispatch(updateProgress(audioRef.current.currentTime));
      audioRef.current.pause();
    } else {
      audioRef.current.currentTime = progress || 0;
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Error playing the song:", error);
      }
    }

    dispatch(playPause());
  };

  const handleSeek = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audioRef.current.duration;

    audioRef.current.currentTime = newTime;
    dispatch(updateProgress(newTime));
  };

  const handleNext = async () => {
    if (songList.length === 0) return;
    dispatch(playPause(false));
    dispatch(handlePlayNext());
  };

  const handlePrev = () => {
    if (songList.length === 0) return;
    dispatch(playPause(false));
    dispatch(playPrev());
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleSkipAd = async () => {
    if (isAdPlaying) {
      dispatch(stopAd());
      dispatch(handlePlayNext());
    }
  };

  useEffect(() => {
    if (currentAd) {
      console.log("Fetched Ads for Free Users:", currentAd);
    }
  }, [currentAd]);

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
        {isAdPlaying ? (
          <div className="flex flex-col items-center gap-4">
            <p>Ad is playing...</p>
            <button
              onClick={handleSkipAd}
              className="bg-red-500 text-white py-1 px-4 rounded"
            >
              Skip Ad
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-4">
              <img className="w-4 cursor-pointer" src={assets.prev_icon} alt="" onClick={handlePrev} />
              <img className="w-4 cursor-pointer" src={isPlaying ? assets.pause_icon : assets.play_icon} alt="" onClick={handlePlayPause} />
              <img className="w-4 cursor-pointer" src={assets.next_icon} alt="" onClick={handleNext} />
            </div>
            <div className="flex items-center gap-5">
              <p>{Math.floor(progress / 60)}:{String(Math.floor(progress % 60)).padStart(2, "0")}</p>
              <div className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer" onMouseDown={handleSeek}>
                <div className="h-1 bg-green-800 rounded-full" style={{ width: `${(progress / currentSong?.duration) * 100}%` }} />
              </div>
              <p>{currentSong.duration}</p>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        <p>Volume</p>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="w-[100px]" />
      </div>
    </div>
  );
};

export default Player;
