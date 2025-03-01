import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faPen, faPlay, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { listAllLikeSong } from "../../../store/likeSlice";

const LikeSong = () => {
  const dispatch = useDispatch();
  
  const { like } = useSelector((state) => state.like);

  useEffect(() => {
    dispatch(listAllLikeSong());
  }, [dispatch]);

  console.log("all the like song", like);

  return (
    <div className="text-white min-h-screen p-6 flex gap-10">
      {/* Left Section: Fixed Width */}
      <div className="flex-none w-[500px] mt-5">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-blue-700 w-80 h-80 flex items-center justify-center rounded-lg shadow-lg">
            <div className="relative">
              <Link to="#">
                <FontAwesomeIcon icon={faThumbsUp} className="text-white text-8xl" />
              </Link>
            </div>
          </div>

          {/* Save Button: Update Image */}
          <button className="bg-[#1c1c1c] text-white py-2 px-4 rounded">
            Save Image
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">Playlist Title</h1>
            <p className="text-gray-400 text-lg">Playlist • Public</p>
            <p className="text-gray-400 text-lg">10 tracks</p>
            <p className="text-white text-lg">Description of the playlist.</p>

            <div className="flex items-center space-x-8 ml-10 mt-5">
              <button className="bg-[#1c1c1c] w-10 h-10 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faPen} className="text-white w-4 h-4" />
              </button>

              <button className="bg-white w-12 h-12 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faPlay} className="text-black w-6 h-6" />
              </button>

              <button className="bg-[#1c1c1c] w-10 h-10 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faMinus} className="text-white w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Suggestions */}
      <div className="flex-1 mt-16">
        <h2 className="text-xl font-bold mb-4 mt-3">All liked songs</h2>
        <div className="grid gap-4 overflow-y-auto" style={{ maxHeight: "500px" }}>
          {/* Song List */}
          {like && like.length > 0 ? (
            like.map((song) => (
              <div key={song._id} className="flex justify-between items-center bg-stone-900 p-3 rounded-lg cursor-pointer group hover:bg-[#ffffff2b] transition duration-300">
                <div className="flex items-center w-1/4 gap-5">
                  <div className="relative w-12 h-12 bg-gray-500 rounded-md overflow-hidden">
                    {/* Use the song image URL if available */}
                    <img className="w-full h-full object-cover" src={song.songId.image || "https://via.placeholder.com/150"} alt="Song Cover" />
                  </div>
                  <div className="w-3/4">
                    <p className="font-semibold">{song.songId.name}</p>
                    <p className="text-gray-400">{song.songId.album}</p>
                  </div>
                </div>
                <div className="flex justify-end items-center space-x-4">
                  <p className="text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </p>
                  <p className="text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </p>
                  <p className="text-[15px]">{song.songId.duration || "3:45"}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No liked songs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikeSong;
