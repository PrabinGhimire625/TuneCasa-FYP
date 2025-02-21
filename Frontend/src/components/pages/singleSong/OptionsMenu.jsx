import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { listAllPlaylist, AddSongOnPlaylist } from "../../../store/playlistSlice";

const OptionsMenu = ({ songId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const { playlist } = useSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(listAllPlaylist());
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddToPlaylist = (playlistId) => {
    dispatch(AddSongOnPlaylist(songId, playlistId));
    setShowPlaylistModal(false); // Close modal after adding
  };

  console.log("Song id is  : ", songId);

  return (
    <>
      <div className="relative inline-block" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-[#121212] text-white rounded-lg shadow-lg p-2 z-50">
            <ul className="space-y-2">
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Play next</li>
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Save to library</li>
              <li
                className="hover:bg-gray-700 p-2 rounded cursor-pointer"
                onClick={() => {
                  setShowPlaylistModal(true); // Show playlist modal
                  setIsOpen(false); // Close options menu
                }}
              >
                Save to playlist
              </li>
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Go to album</li>
              <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Share</li>
            </ul>
          </div>
        )}
      </div>

      {/* Playlist Modal */}
      {showPlaylistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#121212] p-6 rounded-lg w-96 text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Save to playlist</h2>
              <button onClick={() => setShowPlaylistModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <h2 className="text-lg font-bold">Your playlists</h2>
              {playlist && playlist.length > 0 ? (
                <ul className="max-h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 mt-2">
                  {playlist.map((item) => (
                    <li key={item._id} className="mb-3">
                      <button
                        onClick={() => handleAddToPlaylist(item._id)}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 w-full"
                      >
                        <p>{item.title}</p>
                        <p className="text-gray-400">{item.songs.length} songs</p>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No playlists found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OptionsMenu;
