import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playPause, updateProgress, playPrev, handlePlayNext, playAd, stopAd } from "../../../store/playerSlice";
import { assets } from "../../../assets/frontend-assets/assets";

const Player = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, progress, songList, currentAd, isAdPlaying } = useSelector((state) => state.player);

  const audioRef = useRef(new Audio());
  const progressBarRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [localProgress, setLocalProgress] = useState(progress || 0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // ✅ Load & Play New Song or Ad
  useEffect(() => {
    const audioElement = audioRef.current;

    if (currentAd) {
      // If an ad is playing, set ad file and play it
      if (audioElement.src !== currentAd.file) {
        audioElement.pause();
        audioElement.src = currentAd.file;
        audioElement.load();
        audioElement.play().then(() => dispatch(playAd()));
      }

      // Set the ad's duration after metadata is loaded
      audioElement.onloadedmetadata = () => {
        console.log("Ad Duration:", audioElement.duration);
        setDuration(audioElement.duration);
      };
    } else if (currentSong) {
      // If no ad, load and play the song
      if (audioElement.src !== currentSong.file) {
        audioElement.pause();
        audioElement.src = currentSong.file;
        audioElement.load();
        audioElement.play();
      }

      // Set the song's duration after metadata is loaded
      audioElement.onloadedmetadata = () => {
        setDuration(audioElement.duration);
      };
    }

    if (isPlaying) {
      audioElement.play();
    }

    return () => {
      // Ensure we stop audio when switching to another song or ad
      audioElement.pause();
    };
  }, [currentSong, currentAd, isPlaying]);

  // ✅ Handle Play/Pause
  useEffect(() => {
    if (!currentAd && isPlaying) {
      audioRef.current.play();
    } else if (!currentAd && !isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentAd]);

  // ✅ Update Progress Bar Every 500ms (for both song and ad)
 useEffect(() => {
  const interval = setInterval(() => {
    if (!isDragging && isPlaying) {
      const currentTime = audioRef.current.currentTime;
      console.log("Current Progress:", currentTime); // Log progress
      setLocalProgress(currentTime);
      dispatch(updateProgress(currentTime)); // Update redux state
    }
  }, 500);

  return () => clearInterval(interval);
}, [isPlaying, isDragging]);


  // ✅ Handle Song/Ad End & Auto-Next
  useEffect(() => {
    audioRef.current.onended = () => {
      if (isAdPlaying) {
        dispatch(stopAd());
      }
      dispatch(handlePlayNext());
    };
  }, [isAdPlaying]);

  // ✅ Handle Seek (Click + Drag)
  const handleSeekStart = (e) => {
    setIsDragging(true);
    handleSeek(e);
  };

  const handleSeekMove = (e) => {
    if (isDragging) handleSeek(e);
  };

  const handleSeekEnd = (e) => {
    if (isDragging) {
      handleSeek(e, true);
      setIsDragging(false);
    }
  };

  const handleSeek = (e, commit = false) => {
    if (!progressBarRef.current || !audioRef.current.duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * audioRef.current.duration;

    setLocalProgress(newTime);
    if (commit) {
      audioRef.current.currentTime = newTime;
      dispatch(updateProgress(newTime));
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleSeekMove);
      window.addEventListener("mouseup", handleSeekEnd);
    } else {
      window.removeEventListener("mousemove", handleSeekMove);
      window.removeEventListener("mouseup", handleSeekEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleSeekMove);
      window.removeEventListener("mouseup", handleSeekEnd);
    };
  }, [isDragging]);

  const handlePlayPause = () => {
    if (!currentSong || isAdPlaying) return; // Prevent play/pause if ad is playing
    dispatch(playPause());
  };

  const handleNext = () => {
    if (songList.length > 0 && !isAdPlaying) dispatch(handlePlayNext());
  };

  const handlePrev = () => {
    if (songList.length > 0 && !isAdPlaying) dispatch(playPrev());
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleSkipAd = async () => {
    if (isAdPlaying) {
      dispatch(stopAd());  // Stop the ad
      dispatch(handlePlayNext());  // Play the next song after the ad
    }
  };

  console.log("localProgress", localProgress)

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white px-4 h-[100px] flex justify-between items-center">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={isAdPlaying ? currentAd.image : currentSong.image} alt="Cover" />
        <div>
          <p>{isAdPlaying ? currentAd.name : currentSong.name}</p>
          {!isAdPlaying && <p>{currentSong.desc?.slice(0, 12)}</p>}
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 m-auto">
        {isAdPlaying ? (
          <div className="flex flex-col items-center gap-4">
            <button onClick={handleSkipAd} className="bg-red-500 text-white py-1 px-4 rounded">Skip Ad</button>
            <div className="flex gap-5">
              <p>{Math.floor(localProgress / 60)}:{String(Math.floor(localProgress % 60)).padStart(2, "0")}</p>
              <div className="w-[60vw] max-w-[500px] bg-gray-500 rounded-full h-1.5 relative">
                {/* The progress bar will visually update, but no interaction */}
                <div className="h-1.5 bg-white rounded-full" style={{ width: `${(localProgress / (duration || 1)) * 100}%` }} />
              </div>
              <p>{Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, "0")}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="flex gap-4">
              <img className="w-4 cursor-pointer" src={assets.prev_icon} alt="" onClick={handlePrev} />
              <img className="w-4 cursor-pointer" src={isPlaying ? assets.pause_icon : assets.play_icon} alt="" onClick={handlePlayPause} />
              <img className="w-4 cursor-pointer" src={assets.next_icon} alt="" onClick={handleNext} />
            </div>
            <div className="flex items-center gap-5">
              <p>{Math.floor(localProgress / 60)}:{String(Math.floor(localProgress % 60)).padStart(2, "0")}</p>
              <div ref={progressBarRef} className="w-[60vw] max-w-[500px] bg-gray-500 rounded-full cursor-pointer h-1.5 relative" 
                onMouseDown={handleSeekStart}>
                <div className="h-1.5 bg-white rounded-full transition-all duration-100" style={{ width: `${(localProgress / (duration || 1)) * 100}%` }} />
              </div>
              <p>{Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, "0")}</p>
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
