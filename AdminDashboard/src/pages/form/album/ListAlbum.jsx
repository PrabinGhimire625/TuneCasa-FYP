import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAlbum, listAllAlbum } from "../../../store/albumSlice";
import Sidebar from "../../sidebar/Sidebar";

const ListAlbum = () => {
  const dispatch = useDispatch();
  const { albums } = useSelector((state) => state.album);

  useEffect(() => {
    dispatch(listAllAlbum());
  }, [dispatch]);

  //delete albums
  const handleDeleteAlbum = (albumId) => {
    dispatch(deleteAlbum(albumId)); // Dispatches the action
  };

  return (
    <>
      <div className="flex flex-col flex-1 overflow-y-auto min-h-screen">
        <div className="p-4">
          <div className="w-full p-6 text-white bg-gray-900 rounded-lg shadow-xl">
            <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">All albums</h3>
            <div className="space-y-4">
              {albums.map((albumsItem, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg shadow-md transition duration-300 hover:bg-gray-700 cursor-pointer"
                >
                  <div className="w-14 h-14 bg-gray-600 rounded-md overflow-hidden">
                    <img src={albumsItem?.image} alt={albumsItem?.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col flex-grow">
                    <span className="text-white font-semibold text-lg">{albumsItem?.name}</span>
                    <span className="text-gray-400 text-sm">{albumsItem?.artist} • {albumsItem.desc}</span>
                  </div>
                  <button onClick={() => handleDeleteAlbum(albumsItem._id)} className="px-4 py-2 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition">
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListAlbum;
