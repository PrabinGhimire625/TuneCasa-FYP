import React, { useEffect, useState } from "react";
import Sidebar from "../../../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { resetStatus, updateUserProfile, userProfile } from "../../../../../store/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { STATUS } from "../../../../../globals/components/enumStatus/Status";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { profile, status } = useSelector((state) => state.auth);
  console.log(status)
  console.log(profile)

  const [userData, setUserData] = useState({
    username: "",
    image: null,
  });
  
  useEffect(() => {
    dispatch(userProfile(id));
  }, [dispatch, id]);



  useEffect(() => {
    if (profile) {
      setUserData({
        username: profile.username || "",
        image: null, 
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    setUserData({
      ...userData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //FormData allows sending text and file in the same request.
    formData.append("username", userData.username);
    if (userData.image) formData.append("image", userData.image);
  
    dispatch(updateUserProfile({ id, userData: formData })).then(() => {
      if (status === STATUS.SUCCESS) {
          toast.success("Profile updated");
      } else {
          toast.error("Profile not update");
      }
    });
  };
  

  return (


        <div className="flex items-start justify-center flex-1 ">
          <form
            className="flex items-start  px-12 py-12 rounded-lg shadow-[0_0_10px_2px_rgba(255,255,255,0.1)] mt-2 mx-5 relative"
            onSubmit={handleSubmit}
          >
            {/* Profile Image Upload */}
            <div className="relative">
              <label className="cursor-pointer">
                <img
                  className="object-cover rounded-full shadow-lg bg-indigo-50 text-indigo-600 h-40 w-40 md:h-56 md:w-56"
                  src={
                    userData.image
                      ? URL.createObjectURL(userData.image)
                      : profile?.image
                  }
                  alt="Profile"
                />
                <input
                  name="image"
                  onChange={handleChange}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
              <p className="absolute top-2 right-2 text-sm md:text-lg text-gray-400 bg-gray-800 px-2 py-1 rounded cursor-pointer hover:text-white hover:bg-gray-700 transition">
                Upload
              </p>
            </div>

            {/* User Info */}
            <div className="text-left ml-4 mt-8">
              <input
                name="username"
                onChange={handleChange}
                type="text"
                value={userData.username}
                className="text-3xl md:text-6xl text-gray-200 font-bold bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-indigo-400 ml-5 py-1 leading-tight"
              />
            </div>

             {/* Save Button */}
            <button
              type="submit"
              className="absolute bottom-16 right-4 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition"
            >
              Save
            </button>

     
            {/* <button
              type="button"
              className="absolute bottom-4 right-4 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition"
            >
              Request to be a artist
            </button> */}
            
          </form>
        </div>

  );
};

export default EditProfile;
