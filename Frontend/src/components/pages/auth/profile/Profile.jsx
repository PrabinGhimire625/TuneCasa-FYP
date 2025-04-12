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
    <div className="flex flex-col w-full px-4 py-8 gap-8">

      {/* Profile Section */}
      <div className="w-full shadow-lg px-6 py-8 md:px-12 flex flex-col md:flex-row items-center md:items-start justify-between">
        
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
        <div className="text-gray-200 w-full md:w-4/5 text-center md:text-left">
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
      <div className="w-full">
        <h2 className="text-white text-2xl font-semibold mb-4">Following</h2>
        <div className="flex overflow-x-auto gap-4 pb-2">
          {artistOfUserFollow && artistOfUserFollow.length > 0 ? (
            artistOfUserFollow.map((artist) => (
              <div key={artist._id} className="py-2 px-2 flex flex-col items-center relative hover:bg-neutral-800 transition duration-300 rounded-lg">
                <div className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer">
                  <img 
                    src={artist.userId?.image || "https://via.placeholder.com/150"}
                    alt={artist.userId?.username || "Artist"}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 text-4xl opacity-0 hover:opacity-100">
                    ▶
                  </button>
                </div>
                <Link to={`/singleArtist/${artist._id}`}>
                  <p className="mt-2 text-white font-medium hover:underline">{artist.userId?.username || "Unknown Artist"}</p>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No artists found</p>
          )}
        </div>
      </div>

      <PublicPlaylist/>
      {/* <Footer/> */}
    </div>
  );
};

export default Profile;
