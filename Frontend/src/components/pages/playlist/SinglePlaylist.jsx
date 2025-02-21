import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllPlaylist } from "../../../store/playlistSlice";
import { Link } from "react-router-dom";


const SinglePlaylist = () => {
  const dispatch = useDispatch();
  const { playlist } = useSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(listAllPlaylist());
  }, [dispatch]);

  return (
<>
    {playlist && playlist.length > 0 ? (
      <ul className="max-h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 mt-2">
        {playlist.map((item, index) => (
          <li key={index} className="mb-3">
            <Link
              to={`/addSongPlaylist/${item._id}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-[#1a1a1a] transition"
            >
              <div>
                <p className="text-md font-semibold">{item?.title}</p>
                <p className="text-sm text-gray-400">Prabin Ghimire</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-xl">No playlists available</p>
    )}
  </>
  );
};

export default SinglePlaylist;
