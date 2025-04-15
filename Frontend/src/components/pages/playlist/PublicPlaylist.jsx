import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPublicPlaylist } from "../../../store/playlistSlice";
import { Link } from "react-router-dom";
import ShareButton from "../share/ShareButton";


const PublicPlaylist = () => {
  const dispatch = useDispatch();
  const { publicPlaylist } = useSelector((state) => state.playlist);

  useEffect(() => {
    dispatch(listPublicPlaylist());
  }, [dispatch]);

  const generateShareUrl = (playlistId) =>
    `${window.location.origin}/singlePlaylist/${playlistId}`;

  return (
    <div className="min-h-screen w-full px-4 sm:px-6 md:px-12 lg:px-24 text-white">
      <div className="max-w-screen-xl mx-auto py-10">
        <h2 className="text-white text-3xl font-bold mb-8">Public Playlists</h2>

        {publicPlaylist && publicPlaylist.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {publicPlaylist.map((item, index) => {
              const shareUrl = generateShareUrl(item._id);
              return (
                <div
                  key={index}
                  className=" rounded-xl overflow-hidden shadow-[0_0_10px_2px_rgba(255,255,255,0.1)] hover:shadow-lg transition hover:scale-105 duration-200 relative"
                >
                  <Link to={`/singlePlaylist/${item._id}`}>
                    <img
                      className="w-full h-44 object-cover"
                      src={
                        item?.image ||
                        "https://i0.wp.com/www.endofthreefitness.com/wp-content/uploads/2012/06/band-of-brothers.jpeg?resize=640%2C360&ssl=1"
                      }
                      alt="Playlist Cover"
                    />
                  </Link>

                  <div className="flex flex-col items-center justify-center text-center p-3 ">
                    <Link to={`/singlePlaylist/${item._id}`}>
                      <p className="text-md font-semibold text-white truncate">{item?.title}</p>
                      <p className="text-sm text-gray-400 truncate">{item?.userId?.username}</p>
                    </Link>

                    {/* Use the ShareButton component */}
                
                   <ShareButton url={shareUrl} />
               
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xl text-center text-gray-400">No public playlists available</p>
        )}
      </div>
    </div>
  );
};

export default PublicPlaylist;
