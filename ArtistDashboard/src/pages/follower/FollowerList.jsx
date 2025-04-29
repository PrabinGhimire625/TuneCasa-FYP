import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countArtistFollower } from '../../store/authSlice';

const FollowerList = () => {
  const dispatch = useDispatch();

  // Get data from Redux store
  const { artistFollower } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(countArtistFollower());
  }, [dispatch]);

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-semibold text-white mb-6">Followers</h2>

      {artistFollower?.followers?.length > 0 ? (
        <ul className="space-y-4 w-full max-w-5xl">
          {artistFollower.followers.map((follower) => (
            <li
              key={follower._id}
              className="bg-gray-900 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-700"
            >
              <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img
                    src={follower?.image || 'https://via.placeholder.com/150'} 
                    alt={follower.username}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Username and Badge */}
                <div>
                  <p className="text-lg font-semibold">{follower.username}</p>
                  <p className="text-sm text-gray-400">Followed</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No followers yet.</p>
      )}
    </div>
  );
};

export default FollowerList;
