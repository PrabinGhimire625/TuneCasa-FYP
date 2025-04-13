import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { artistProfile, countArtistFollower } from "../../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import TrendingSong from "../../mostPlaySong/TrendingSong";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, status } = useSelector((state) => state.auth);
  const { artistFollower } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(artistProfile());
      dispatch(countArtistFollower());
    }
  }, [dispatch]);

  if (status === "loading") {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <>
    <div className="text-white py-10 px-4">
      <div className="mx-auto p-8 rounded-lg shadow-lg">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative">
          <Link to={`/editProfile/${profile?.id}`}>
            <img
              className="rounded-full h-40 w-40 md:h-56 md:w-56 object-cover border-4 border-gray-700"
              src={profile?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD116U9ZCk8bEaanCeB5rSCC2uqY5Ka_2_EA&s"}
              alt="Profile"
            />
      
              <p className="absolute bottom-2 right-2 text-sm bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded-md cursor-pointer">
                Edit
              </p>
            </Link>
          </div>

          <div className="flex-1 text-left">
          <Link to={`/editProfile/${profile?.id}`}> <h1 className="text-4xl font-bold">{profile?.username || "Artist Name"}</h1></Link>
            <Link to="/followerList">
              <p className="mt-2 text-gray-400 hover:text-white hover:underline">
                {artistFollower?.totalFollowers || 0} Followers
              </p>
            </Link>

            <p className="mt-4 text-gray-300">
              {profile?.bio || "This artist has not added a bio yet."}
            </p>
          </div>
        </div>

      </div>
    </div>
    <TrendingSong/>
    
   </>
  );
};

export default Profile;
