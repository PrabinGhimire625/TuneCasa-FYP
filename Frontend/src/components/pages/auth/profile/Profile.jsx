import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetStatus, userProfile } from "../../../../store/authSlice";
import { Link } from "react-router-dom";
import Sidebar from "../../sidebar/Sidebar";
import { STATUS } from "../../../../globals/components/enumStatus/Status";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, status } = useSelector((state) => state.auth);
  console.log("Status is printing : " , status)
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(userProfile()); // Fetch user profile only if the token exists
    }
  }, [dispatch]);

 
  if (status === "loading") {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="h-screen bg-black ">
      <div className="h-[90%] flex">
    

        <div className="flex items-start justify-center flex-1 bg-stone-900">
          <div className="w-full flex items-start bg-stone-800 px-12 py-12 rounded-lg shadow-lg ml-10 mt-2 mr-5">
            {/* Profile Image */}
            <div className="relative">
              <Link to={`/editProfile/${profile?._id}`}>
                <img
                  className="object-cover rounded-full shadow-lg bg-indigo-50 text-indigo-600 h-40 w-40 md:h-56 md:w-56"
                  src={profile?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD116U9ZCk8bEaanCeB5rSCC2uqY5Ka_2_EA&s"}
                  alt="Profile"
                />
                <p className="absolute top-2 right-2 text-sm md:text-lg text-gray-400 bg-gray-800 px-2 py-1 rounded cursor-pointer hover:text-white hover:bg-gray-700 transition">
                  Edit
                </p>
              </Link>
            </div>

            {/* User Info */}
            <div className="text-left ml-8 mt-12 ">
              <Link to={`/editProfile/${profile?._id}`}>
                <h1 className="text-7xl md:text-12xl text-gray-200 font-bold">
                  {profile?.username || "Guest"}
                </h1>
              </Link>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
