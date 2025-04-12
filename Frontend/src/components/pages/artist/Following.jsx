import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getArtistsUserIsFollowing } from '../../../store/authSlice';
import Footer from '../../../globals/components/footer/Footer';

const Following = () => {
  const dispatch = useDispatch();
  const { artistOfUserFollow, countfollowing } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getArtistsUserIsFollowing());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Main Content */}
      <main className="">
        <h1 className="text-white font-bold text-3xl my-5">Following Artists</h1>

        <div className="w-full flex overflow-x-auto gap-6 pb-4">
          {artistOfUserFollow && artistOfUserFollow.length > 0 ? (
            artistOfUserFollow.map((artist) => (
              <div
                key={artist._id}
                className="min-w-[150px] py-2 px-2 flex flex-col items-center relative hover:bg-neutral-800 transition duration-300 rounded-lg"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer">
                  <img
                    src={artist.userId?.image || 'https://via.placeholder.com/150'}
                    alt={artist.userId?.username || 'Artist'}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-4xl opacity-0 hover:opacity-100 transition-opacity duration-300">
                    ▶
                  </button>
                </div>
                <Link to={`/singleArtist/${artist._id}`}>
                  <p className="mt-2 text-white font-medium hover:underline">
                    {artist.userId?.username || 'Unknown Artist'}
                  </p>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No artists found</p>
          )}
        </div>
      </main>

      {/* Footer stays at the bottom */}
      <Footer />
    </div>
  );
};

export default Following;
