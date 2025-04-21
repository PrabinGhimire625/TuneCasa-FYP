import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPublicPlaylist } from "../../../store/playlistSlice";
import { Link } from "react-router-dom";
import ShareButton from "../share/ShareButton";
import Footer from "../../../globals/components/footer/Footer";


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
      <div className="max-w-screen-xl mx-auto ">
        <h2 className="text-white text-2xl font-bold mb-8">Your Playlists</h2>

        {publicPlaylist && publicPlaylist.length > 0 ? (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
    {publicPlaylist.map((item, index) => {
      const shareUrl = generateShareUrl(item._id);
      return (
        <div
          key={index}
          className="flex flex-col items-center text-center group bg-[#111] rounded-lg overflow-hidden transition duration-300 shadow-md hover:shadow-lg hover:bg-stone-900"
        >
          <Link to={`/singlePlaylist/${item._id}`} className="w-full">
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 overflow-hidden cursor-pointer rounded-md transition duration-300 group">
              <img
                src={
                  item?.image ||
                  "https://i0.wp.com/www.endofthreefitness.com/wp-content/uploads/2012/06/band-of-brothers.jpeg?resize=640%2C360&ssl=1"
                }
                alt={`Playlist ${item?.title}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </Link>
          <div className="flex flex-col items-center justify-center text-center p-2">
            <Link to={`/singlePlaylist/${item._id}`}>
              <p className="text-sm md:text-base font-medium truncate w-full px-2 text-gray-100 hover:underline">
                {item?.title}
              </p>
              <p className="text-xs text-gray-400 truncate">{item?.userId?.username}</p>
            </Link>
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
            <Footer />
    </div>
  );
};

export default PublicPlaylist;
