import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPublicPlaylist } from "../../../store/playlistSlice";
import { Link } from "react-router-dom";

const PublicPlaylist = () => {
  const dispatch = useDispatch();
  const { publicPlaylist } = useSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(listPublicPlaylist());
  }, [dispatch]);

  return (
    <div className="w-full mt-4">
        <h2 className="text-white text-2xl font-semibold mb-4">Public playlist</h2>
      {publicPlaylist && publicPlaylist.length > 0 ? (
        <div className="flex items-center justify-content gap-4">
          {publicPlaylist.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center  rounded-lg p-2 hover:bg-stone-900 transition duration-300 w-40">
              <Link to={`/singlePlaylist/${item._id}`} className="w-full text-center">
                <div className="flex items-center justify-center">
                  <img
                    className="w-28 h-28 object-cover rounded-lg mb-2"
                    src={item?.image || "https://i0.wp.com/www.endofthreefitness.com/wp-content/uploads/2012/06/band-of-brothers.jpeg?resize=640%2C360&ssl=1"}
                    alt="Playlist Cover"
                  />
                </div>
                <p className="text-base font-semibold text-white mb-0.5">{item?.title}</p>
                <p className="text-xs text-gray-400">{item?.userId?.username}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl text-center text-gray-400">No playlists available</p>
      )}
    </div>
  );
};

export default PublicPlaylist;