import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllPlaylist } from "../../../store/playlistSlice";
import { Link } from "react-router-dom";

const AllPlaylist = () => {
  const dispatch = useDispatch();
  const { playlist } = useSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(listAllPlaylist());
  }, [dispatch]);
   
  console.log(playlist)
  return (
<>
    {playlist && playlist.length > 0 ? (
      <ul className="max-h-64 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-900 mt-4">
        {playlist.map((item, index) => (
          <li key={index} className="mb-3">
            <Link
              to={`/singlePlaylist/${item._id}`}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-900 transition"
            >
            <div className="flex justify-between items-center">
              <img 
                className="w-10 h-10 object-cover" 
                src={item?.image || "https://i0.wp.com/www.endofthreefitness.com/wp-content/uploads/2012/06/band-of-brothers.jpeg?resize=640%2C360&ssl=1"} 
                alt="Song Cover" 
              />
              <div className="ml-4">
                <p className="text-md font-semibold text-gray-400">{item?.title}</p>
                <p className="text-sm text-gray-400">{item?.userId?.username}</p>
              </div>
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

export default AllPlaylist;
