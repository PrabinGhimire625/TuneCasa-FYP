import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArtistSong } from '../../../store/songSlice';
import { Link, useParams } from 'react-router-dom';
import { fetchSingleUser, followArtist, getArtistFollowersCount, UnfollowArtist } from '../../../store/authSlice';
import { setCurrentSong, playPause, setSongList } from '../../../store/playerSlice';
import { FaPause, FaPlay } from 'react-icons/fa';
import LatestArtistSong from '../recommendation/LatestArtistSong';
import Footer from '../../../globals/components/footer/Footer';

const ArtistDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { artistSong } = useSelector((state) => state.song);
  const { singleUser, followersCount } = useSelector((state) => state.auth);
  const { currentSong, isPlaying } = useSelector((state) => state.player);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAllSongs, setShowAllSongs] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id));
      dispatch(getArtistSong(id));
      dispatch(getArtistFollowersCount(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (artistSong && artistSong.length > 0) {
      dispatch(setSongList(artistSong));
    }
  }, [artistSong, dispatch]);

  const handleSelectSong = (songItem) => {
    if (currentSong?._id === songItem._id) {
      dispatch(playPause());
    } else {
      dispatch(setCurrentSong(songItem));
      dispatch(playPause(true));
    }
  };

  const handleFollowUnfollow = () => {
    if (isFollowing) {
      dispatch(UnfollowArtist(id));
    } else {
      dispatch(followArtist(id));
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="text-white px-4 md:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Artist Profile */}
        <div className="py-10 flex flex-col md:flex-row gap-8 items-center md:items-end shadow-lg relative">
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <img
              src={singleUser?.user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9nFbCnqa-fAIyStp-cQG9M-LezEqxUz0HYg&s"}
              alt="Artist Cover"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full object-cover transition-all duration-300"
            />
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-yellow-700 text-sm">Artist</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {singleUser?.user?.username || "Unknown Artist"}
            </h2>
            <h4 className="text-lg sm:text-xl md:text-2xl text-gray-400 hover:text-white cursor-pointer">
              {followersCount || "0"} follower{followersCount !== 1 ? 's' : ''}
            </h4>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              onClick={handleFollowUnfollow}
              className={`py-1.5 px-4 text-xs font-semibold rounded-full border border-white transition duration-300 
      ${isFollowing ? 'bg-transparent text-white' : 'bg-transparent text-white'} hover:bg-[#e63127]`}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          </div>

          {/* View More Button aligned to far right */}
          {singleUser?.user?._id && (
            <div className="absolute right-5 bottom-5 md:static md:ml-auto">
              <Link to={`/singleArtist/${singleUser.user._id}`}>
                <button className="text-yellow-500 underline hover:text-blue-500 text-sm font-medium">
                  View More
                </button>
              </Link>
            </div>
          )}
        </div>


        {/* Songs Section */}
        <div className="mt-10 px-2 sm:px-5">
          <h2 className="text-white text-2xl font-semibold mb-4">Popular</h2>

          {artistSong && artistSong.length > 0 ? (
            <>
              <div className="space-y-2">
                {(showAllSongs ? artistSong : artistSong.slice(0, 4)).map((item, index) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-3 sm:grid-cols-4 gap-2 py-3 px-4 rounded-lg items-center hover:bg-[#ffffff18] transition cursor-pointer"
                    onClick={() => handleSelectSong(item)}
                  >
                    {/* Index and Song Cover */}
                    <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                      <span className="text-sm text-gray-400 font-medium">{index + 1}</span>
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-700">
                        <img src={item.image} alt="Song" className="w-full h-full object-cover" />
                        <button
                          className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${currentSong?._id === item._id && isPlaying
                            ? 'opacity-100'
                            : 'opacity-0 hover:opacity-100'
                            }`}
                        >
                          {currentSong?._id === item._id && isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                      </div>
                      <span className="text-white truncate max-w-[100px]">{item.name}</span>
                    </div>

                    {/* Album Name */}
                    <div className="text-sm text-gray-400 truncate">{item.album || "Unknown Album"}</div>

                    {/* Views */}
                    <div className="text-sm text-gray-400 hidden sm:block">21</div>

                    {/* Duration */}
                    <div className="text-sm text-gray-400 text-center">{item.duration}</div>
                  </div>
                ))}
              </div>

              {/* Toggle Button */}
              {artistSong.length > 4 && (
                <div className="mt-6 flex justify-end px-4">
                  <button
                    onClick={() => setShowAllSongs(!showAllSongs)}
                    className="text-yellow-500 hover:text-blue-500 text-sm underline font-medium transition duration-300"
                  >
                    {showAllSongs ? "Show Less" : "View More"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-gray-400 mt-4">No songs available from this artist.</p>
          )}
        </div>

        {/* Latest Songs Recommendation */}
        <div className='latest artist sectiom'>
          <LatestArtistSong id={id} />
        </div>

        {/*footer */}
        <div className='latest artist sectiom'>
          <Footer />
        </div>


      </div>
    </div>
  );
};

export default ArtistDetails;
