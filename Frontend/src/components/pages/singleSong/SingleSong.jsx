import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listSingleSong } from '../../../store/songSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
  faPlay,
  faPause,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';
import { setCurrentSong, playPause } from '../../../store/playerSlice';
import { toast } from 'react-toastify';
import OptionsMenu from './OptionsMenu';
import Footer from '../../../globals/components/footer/Footer';
import LatestSystemSong from '../recommendation/LatestSystemSong';
import { verifyActiveSubscription } from '../../../store/subscriptionSlice';
import { STATUS } from '../../../globals/components/enumStatus/Status';

const SingleSong = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const navigate = useNavigate();
  const { status, subscription } = useSelector((state) => state.subscription);

  const { singleSong } = useSelector((state) => state.song);
  console.log("singlesong", singleSong)

  useEffect(() => {
    if (id) dispatch(listSingleSong(id));
  }, [dispatch, id]);

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
      const response = await fetch(song?.file, { mode: 'cors' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${song?.name || 'audio'}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Failed to download song.');
    }
  };


  useEffect(() => {
    dispatch(verifyActiveSubscription());
  }, [dispatch]);

  console.log("subscription", subscription)

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 md:px-12 lg:px-24 text-white">
      <div className="max-w-screen-xl mx-auto py-10">
        {/* Song Header */}
        <div className="flex flex-col p-5 md:flex-row items-center gap-8 mb-12 shadow-lg">
          <img
            className="w-full max-w-xs md:w-64 md:h-64 rounded-xl object-cover shadow-lg"
            src={singleSong?.image || 'https://via.placeholder.com/150'}
            alt="Song Cover"
          />
          <div className="flex flex-col text-center md:text-left">
            <span className="text-gray-400 uppercase text-sm tracking-widest">Song</span>
            <h1 className="text-4xl md:text-6xl font-bold hover:underline decoration-2 cursor-pointer mt-2">
              {singleSong?.name || 'Unknown Song'}
            </h1>

            <Link to={`artistDetails/${singleSong?._id}`}>
              <p className="text-gray-400 mt-4 max-w-xl">{singleSong?.username || 'Unknown Artist'}</p>

            </Link>

          </div>
        </div>

        {/* Song Row (Just like in Album Songs list) */}
        {singleSong && (
          <div className="flex justify-between items-center p-3 rounded-lg shadow-[0_0_10px_2px_rgba(255,255,255,0.1)] hover:bg-[#1f1f1f] transition-all duration-200 group">
            {/* Left */}
            <div className="flex items-center gap-3 w-1/3">
              <span className="w-6 text-center text-sm text-gray-400">1</span>
              <div className="relative w-10 h-10 rounded-md overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={singleSong?.image}
                  alt="Song Thumbnail"
                />
                <button
                  onClick={() => handleSelectSong(singleSong)}
                  className="absolute inset-0 flex items-center justify-center shadow-lg text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {currentSong?._id === singleSong._id && isPlaying ? (
                    <FontAwesomeIcon icon={faPause} />
                  ) : (
                    <FontAwesomeIcon icon={faPlay} />
                  )}
                </button>
              </div>
              <span className="text-white hover:underline text-sm md:text-base">{singleSong.name}</span>
            </div>

            {/* Middle */}
            <div className="hidden sm:flex justify-between items-center text-sm w-1/3 pr-6">
              <p className="truncate text-gray-400">{singleSong?.album || 'Unknown Album'}</p>
              <p className="text-sm text-gray-400">{singleSong?.duration || '0:00'}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4 w-1/3 justify-end pr-2 sm:pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FontAwesomeIcon icon={faThumbsUp} className="cursor-pointer hover:text-white" />
              <FontAwesomeIcon icon={faThumbsDown} className="cursor-pointer hover:text-white" />

              {status === STATUS.SUCCESS && subscription ? (
                <FontAwesomeIcon
                  icon={faDownload}
                  className="cursor-pointer hover:text-white"
                  onClick={() => handleDownload(singleSong)}
                />
              ) : null}

              <OptionsMenu songId={singleSong._id} />
            </div>
          </div>
        )}
      </div>
      <div className='mb-6'>
        <LatestSystemSong />
      </div>
      <Footer />
    </div>
  );
};

export default SingleSong;
