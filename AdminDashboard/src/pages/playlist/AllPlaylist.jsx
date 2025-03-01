import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import { deletePlaylist, listAllPlaylist } from "../../store/playlistSlice";


const AllPlaylist = () => {
  const dispatch = useDispatch();
  const { playlist } = useSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(listAllPlaylist());
  }, [dispatch]);

     //delete playlist
      const handleDeletePlaylist = (playlistId) => {
        dispatch(deletePlaylist(playlistId)); // Dispatches the action
    };



  return (
    <>
     <div className="flex h-screen bg-stone-900">
          <Sidebar/>

          <div className="flex flex-col flex-1 overflow-y-auto min-h-screen">
              <div className="p-4">
              <div className="w-full p-6 text-white bg-stone-800 rounded-lg shadow-xl">
      <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">All playlists</h3>
      <div className="space-y-4">
        {playlist.map((playlistItem, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 bg-stone-900 p-3 rounded-lg shadow-md transition duration-300 hover:bg-gray-700 cursor-pointer"
          >
            <div className="w-14 h-14 bg-gray-600 rounded-md overflow-hidden">
              <img src={playlistItem?.image || "https://i0.wp.com/www.endofthreefitness.com/wp-content/uploads/2012/06/band-of-brothers.jpeg?resize=640%2C360&ssl=1"}  className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col flex-grow">
              <span className="text-white font-semibold text-lg">{playlistItem?.title}</span>
              <span className="text-gray-400 text-sm">{playlistItem?.artist} • {playlistItem.desc}</span>
            </div>
            <button onClick={() => handleDeletePlaylist(playlistItem._id)} className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition">
              x
            </button>
          </div>
        ))}
      </div>
    </div>
              </div>
          </div>
       </div>
    
    </>
   
  );
};

export default AllPlaylist;
