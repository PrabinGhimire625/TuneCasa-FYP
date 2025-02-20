import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listSingleSong } from '../../../store/songSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEllipsisV, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { setCurrentSong, playPause } from '../../../store/playerSlice';
import Player from '../player/Player';

const SingleSong = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const { singleSong } = useSelector((state) => state.song);

  useEffect(() => {
    if (id) {
      dispatch(listSingleSong(id)); // Fetch the single song details based on ID
    }
  }, [dispatch, id]);

  console.log(id);
  console.log('single song data is', singleSong);

  const handleSelectSong = (songItem) => {
    if (currentSong?._id === songItem._id) {
      dispatch(playPause()); // Toggle play/pause if the same song is clicked
    } else {
      dispatch(setCurrentSong(songItem)); 
      dispatch(playPause(true)); // Ensure play starts when selecting a new song
    }
  };

  return (
    <div className="w-full h-full">
      {/* Top artist profile section */}
      <div className="py-10 flex gap-8 flex-col md:flex-row md:items-end bg-neutral-900">
        <div className="ml-5">
          <img
            src={singleSong?.image || 'https://via.placeholder.com/150'}
            alt="Artist Cover"
            className="w-40 h-40 object-cover"
          />
        </div>
        <div className="flex flex-col text-white">
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{singleSong?.name || 'Unknown Song'}</h2>
          <h4 className="text-lg text-gray-400">{singleSong?.artist || 'Unknown Artist'}</h4>
        </div>
      </div>

      {/* Song Details Section */}
      <div className="mt-6 ml-5">
        {singleSong ? (
          <div
            className="flex p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer group"
            onClick={() => handleSelectSong(singleSong)}
          >
            {/* Image Section */}
            <div className="flex items-center w-1/3">
              <b className="mr-4 text-[#a7a7a7]">1</b>
              <div className="relative w-10 h-10 bg-gray-500 rounded-md overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={singleSong?.image || 'https://via.placeholder.com/150'}
                  alt="Song Cover"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md transition-opacity duration-300"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent div click
                    handleSelectSong(singleSong);
                  }}
                >
                  <FontAwesomeIcon icon={currentSong?._id === singleSong?._id && isPlaying ? faPause : faPlay} className="text-white" />
                </button>
              </div>
              <span className="text-white ml-3">{singleSong?.name || 'Untitled'}</span>
            </div>

            {/* Text Section (Duration, ..., +) */}
            <div className="flex justify-end items-center w-2/3 space-x-4 mr-16">
              {/* Like icon */}
              <p className="text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FontAwesomeIcon icon={faThumbsUp} />
              </p>

              {/* Unlike icon */}
              <p className="text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FontAwesomeIcon icon={faThumbsDown} />
              </p>

              {/* Ellipsis icon */}
              <p className="text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FontAwesomeIcon icon={faEllipsisV} />
              </p>

              {/* Song Duration */}
              <p className="text-[15px]">{singleSong?.duration || '0:00'}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No song available</p>
        )}
      </div>

      <Player />
    </div>
  );
};

export default SingleSong;
