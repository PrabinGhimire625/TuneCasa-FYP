import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getArtistsUserIsFollowing,
  userProfile,
} from "../../../../store/authSlice";
import { Link } from "react-router-dom";
import AllPlaylist from "../../playlist/AllPlaylist";
import PublicPlaylist from "../../playlist/PublicPlaylist";
import Footer from "../../../../globals/components/footer/Footer";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, status, artistOfUserFollow, followingCount } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getArtistsUserIsFollowing());
  }, [dispatch, followingCount]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(userProfile());
    }
  }, [dispatch]);

  if (status === "loading") {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 md:px-12 lg:px-24 text-white">
      <div className="max-w-screen-xl mx-auto py-10">
        {/* Album Header */}
        {/* Profile Section */}
        <div className="w-full shadow-[0_0_10px_2px_rgba(255,255,255,0.1)] px-6 py-8 md:px-12 flex flex-col md:flex-row items-center md:items-start justify-between">

          {/* Profile Image */}
          <div className="relative mb-6 md:mb-0 md:w-1/5 flex justify-center">
            <Link to={`/editProfile/${profile?._id}`}>
              <img
                className="object-cover rounded-full shadow-lg h-40 w-40 md:h-56 md:w-56"
                src={
                  profile?.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD116U9ZCk8bEaanCeB5rSCC2uqY5Ka_2_EA&s"
                }
                alt="Profile"
              />
            </Link>
          </div>

          {/* User Info */}
          <div className="text-gray-200 w-full md:w-4/5 text-center md:text-left ml-8 mt-4" >
            <Link to={`/editProfile/${profile?._id}`}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold">
                {profile?.username || "Guest"}
              </h1>
              <h3 className="text-xl sm:text-xl md:text-2xl font-medium mt-3">
                {profile?.email || "Guest"}
              </h3>
            </Link>
            <Link to={"/following"}>
              <h3 className="text-gray-400 text-xl font-medium mt-3 hover:underline">
                {`${followingCount || 0} following`}
              </h3>
            </Link>
          </div>
        </div>

        {/* Artists Following Section */}
        <div className="w-full mt-8">
        <h2 className="text-white text-2xl font-bold mb-5">Following</h2>
          <div className="flex overflow-x-auto gap-4 pb-2">
            <div className="flex overflow-x-auto gap-4 pb-2">
              {artistOfUserFollow && artistOfUserFollow.length > 0 ? (
                artistOfUserFollow.map((artist) => (
                  <div
                    key={artist._id}
                    className="flex flex-col items-center text-center group w-full"
                  >
                    <Link to={`/singleArtist/${artist._id}`} className="w-full flex justify-center">
                      <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full overflow-hidden cursor-pointer transition duration-300 group shadow-md">
                        <img
                          src={artist.userId?.image || "https://via.placeholder.com/150"}
                          alt={artist.userId?.username || "Artist"}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                    <h3 className="mt-2 text-sm md:text-base font-medium truncate text-center text-gray-100">
                      {artist.userId?.username || "Unknown Artist"}
                    </h3>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No artists found</p>
              )}
            </div>

          </div>
        </div>
      </div>

      <PublicPlaylist />
      <Footer />



    </div>
  );
};

export default Profile;
