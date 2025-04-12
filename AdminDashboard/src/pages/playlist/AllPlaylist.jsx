import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlaylist, listAllPlaylist } from "../../store/playlistSlice";

const AllPlaylist = () => {
  const dispatch = useDispatch();
  const { playlist } = useSelector((state) => state.playlist);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(listAllPlaylist());
  }, [dispatch]);

  const handleDeletePlaylist = (playlistId) => {
    dispatch(deletePlaylist(playlistId));
  };

  // Safe filtering
  const filteredPlaylists = playlist.filter((playlistItem) => {
    const query = searchQuery.trim().toLowerCase();
    return (
      (playlistItem?.title || "").toLowerCase().includes(query) ||
      (playlistItem?.artist || "").toLowerCase().includes(query) ||
      (playlistItem?.description || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col flex-1 overflow-y-auto min-h-screen bg-gray-800">
      <div className="p-6">
        <div className="w-full p-8 text-white bg-gray-900 rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">All Playlists</h3>
            <span className="text-sm text-gray-400">
              {filteredPlaylists.length} Playlists Found
            </span>
          </div>

          {/* Search Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by title, artist, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Playlist Cards */}
          <div className="space-y-6">
            {filteredPlaylists.length > 0 ? (
              filteredPlaylists.map((playlistItem) => (
                <div
                  key={playlistItem._id}
                  className="flex items-center gap-6 p-5 rounded-lg shadow-md bg-gray-800 hover:bg-gray-700 transition-all duration-300 relative group"
                >
                  {/* Image */}
                  <div className="w-20 h-20 bg-gray-600 rounded-md overflow-hidden flex-shrink-0 shadow-lg">
                    <img
                      src={
                        playlistItem?.image ||
                        "https://i0.wp.com/www.endofthreefitness.com/wp-content/uploads/2012/06/band-of-brothers.jpeg?resize=640%2C360&ssl=1"
                      }
                      alt={playlistItem?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text Info */}
                  <div className="flex flex-col justify-center flex-grow">
                    <span className="text-xl font-semibold text-white mb-1">
                      {playlistItem?.title || "Untitled Playlist"}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {playlistItem?.artist || "Unknown Artist"} •{" "}
                      {playlistItem?.description || "No description"}
                    </span>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeletePlaylist(playlistItem._id)}
                    className="absolute top-3 right-3 text-gray-400 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-full text-sm transition"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-6">
                No playlists match your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPlaylist;
