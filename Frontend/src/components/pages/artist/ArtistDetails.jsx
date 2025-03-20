import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArtistSong } from '../../../store/songSlice';
import { Link, useParams } from 'react-router-dom';
import Player from '../player/Player';
import DisplayArtist from "./DisplayArtist";
import { fetchSingleUser } from '../../../store/authSlice';
import { setCurrentSong, playPause, setSongList } from '../../../store/playerSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

const ArtistDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { artistSong } = useSelector((state) => state.song);
  const { singleUser } = useSelector((state) => state.auth);
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllSongs, setShowAllSongs] = useState(false);


  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id));
      dispatch(getArtistSong(id));
    }
  }, [dispatch, id]);

    useEffect(() => {
      if (artistSong && artistSong.length > 0) {
        dispatch(setSongList(artistSong));
      }
    }, [artistSong, dispatch]);

  //handle selected song
  const handleSelectSong = (songItem) => {
    if (currentSong?._id === songItem._id) {
      dispatch(playPause());
    } else {
      dispatch(setCurrentSong(songItem));
      dispatch(playPause(true));
    }
  };


  return (
    <div className="w-full h-full">
      {/* Top artist profile section */}
      <div className="py-10 flex gap-8 flex-col md:flex-row md:items-end bg-neutral-900 ">
        <div className="ml-16">
          <img
            src={singleUser?.user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9nFbCnqa-fAIyStp-cQG9M-LezEqxUz0HYg&s"}
            alt="Artist Cover"
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col text-white">
          <p className='text-yellow-700'>Artist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{singleUser?.user?.username || "Unknown Artist"}</h2>
          <h4 className="text-lg text-gray-400">{singleUser?.bio || "No bio available"}</h4>
        </div>

            {singleUser?.user?._id && (
        <Link to={`/singleArtist/${singleUser.user._id}`}>
          <button className="text-yellow-500 underline hover:text-blue-500 ml-5 mt-5">
            View More
          </button>
        </Link>
)}
      </div>



      {/* Middle Play */}
      <div className="mt-6 flex items-center gap-4 ml-10">
        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-white text-white hover:bg-gray-700 transition">
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-white text-black hover:bg-white transition">
          <FontAwesomeIcon icon={faPlay} />
        </button>

        <button className="w-8 h-8 flex items-center justify-center rounded-full border border-white text-white hover:bg-gray-700 transition">
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>

        {/* Follow Button */}
        <button
          onClick={() => setIsFollowing(!isFollowing)}
          className={`py-1 px-5 text-sm font-semibold rounded-full border-2 border-white transition duration-300 ${isFollowing ? 'bg-transparent text-white' : 'bg-transparent text-white'} hover:bg-[#e63127]`}
        >
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>

      {/* List Song Section */}
      <div className="mt-6 ml-5">
        {artistSong && artistSong.length > 0 && (showAllSongs ? artistSong : artistSong.slice(0, 4)).map((item, index) => (
          <div key={item._id} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer" onClick={() => handleSelectSong(item)}>
            <div className="flex items-center">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <div className="relative w-10 h-10 bg-gray-500 rounded-md overflow-hidden">
                <img className="w-full h-full object-cover" src={item.image} alt="Song Cover" />
                <button className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md transition-opacity duration-300 ${currentSong?._id === item._id && isPlaying ? "opacity-100" : "opacity-0 hover:opacity-100"}`}>
                  {currentSong?._id === item._id && isPlaying ? "⏸" : "▶"}
                </button>
              </div>
              <span className="text-white ml-3">{item.name}</span>
            </div>
            <p className="text-[15px]">{item.album || "Unknown Album"}</p>
            <p className="text-[15px] hidden sm:block">4578</p>
            <p className="text-[15px] text-center">{item.duration}</p>
          </div>
        ))}
      </div>

      {/* See More Button
      {artistSong && artistSong.length > 4 && (
        <div className="mb-5 ml-7">
          <button onClick={toggleShowAllSongs} className="text-gray-400 px-4 py-1 rounded-full hover:bg-gray-700 transition">
            {showAllSongs ? "Show Less" : "See More"}
          </button>
        </div>
      )} */}

      {/* Suggest for You */}
      {/* <div className="ml-5">
        <h1 className="my-3 text-white font-bold text-2xl">Suggest for You</h1>
        <div className="flex overflow-auto gap-4">
          {artistSong && artistSong.length > 0 ? (
            artistSong.map((item) => (
              <div key={item.id} className="py-2 px-2 flex flex-col items-center relative hover:bg-neutral-800 transition duration-300">
                <div
                  className="relative w-32 h-32 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => handleSelectSong(item)}
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <button className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 text-4xl ${currentSong?._id === item._id && isPlaying ? "opacity-100" : "opacity-0 hover:opacity-100"}`}>
                    {currentSong?._id === item._id && isPlaying ? "⏸" : "▶"}
                  </button>
                </div>
                <Link to={`/singleSong/${item._id}`}>
                  <p className="mt-2 text-white font-medium hover:underline">{item.name}</p>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No albums available</p>
          )}
        </div>
      </div> */}

      {/* Artist Section */}
      <div className="#">
        <DisplayArtist />
      </div>

      <Player />
    </div>
  );
};

export default ArtistDetails;
