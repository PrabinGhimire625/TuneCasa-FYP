import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAlbum, listAllAlbum } from "../../../store/albumSlice";
import Sidebar from "../../sidebar/Sidebar";
import { Link } from "react-router-dom";

const ListAlbum = () => {
  const dispatch = useDispatch();
  const { albums } = useSelector((state) => state.album);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(listAllAlbum());
  }, [dispatch]);

  const handleDeleteAlbum = (albumId) => {
    dispatch(deleteAlbum(albumId));
  };

  const filteredAlbums = albums.filter((albumItem) => {
    const query = searchQuery.trim().toLowerCase();
    return (
      (albumItem?.name || "").toLowerCase().includes(query) ||
      (albumItem?.artist || "").toLowerCase().includes(query) ||
      (albumItem?.desc || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col flex-1 overflow-y-auto min-h-screen bg-gray-800">
      <div className="p-6">
        <div className="w-full p-6 text-white bg-gray-900 rounded-lg shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">All Albums</h3>
            <span className="text-sm text-gray-400">
              {filteredAlbums.length} Found
            </span>
          </div>

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name, artist, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Album List */}
          <div className="space-y-4">
            {filteredAlbums.length > 0 ? (
              filteredAlbums.map((albumItem) => (
                <Link
                  to={`/album/${encodeURIComponent(albumItem?.name)}`}
                  key={albumItem._id}
                  className="block"
                >
                  <div className="flex gap-6 p-4 rounded-lg shadow-md bg-gray-800 hover:bg-gray-700 transition-all duration-300 relative">
                    {/* Album Image */}
                    <div className="w-20 h-20 bg-gray-600 rounded-md overflow-hidden shadow-md">
                      <img
                        src={albumItem?.image || "https://via.placeholder.com/100"}
                        alt={albumItem?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center">
                      <span className="text-xl font-semibold text-white mb-1">
                        {albumItem?.name || "Untitled Album"}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {albumItem?.artist || "Unknown Artist"} •{" "}
                        {albumItem?.desc || "No description"}
                      </span>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteAlbum(albumItem._id);
                      }}
                      className="absolute top-3 right-3 text-gray-400 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-full text-sm transition"
                    >
                      ✕
                    </button>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center text-gray-400 py-6">
                No albums match your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListAlbum;
