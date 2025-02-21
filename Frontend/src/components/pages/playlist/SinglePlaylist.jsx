import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePlaylist } from "../../../store/playlistSlice";
import { listAllSong } from "../../../store/songSlice";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import OptionsMenu from "../singleSong/OptionsMenu";

const SinglePlaylist = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleplaylist } = useSelector((state) => state.playlist);
  const { song } = useSelector((state) => state.song);

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePlaylist(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(listAllSong());
  }, [dispatch]);

  return (
    <div className="text-white min-h-screen p-6 flex gap-10">
      {/* Left Section: Fixed Width */}
      <div className="flex-none w-[500px] mt-5">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-gray-800 w-80 h-80 flex items-center justify-center rounded-lg shadow-lg">
            <p className="text-gray-400 text-xl">Playlist Cover</p>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">{singleplaylist?.title}</h1>
            <p className="text-gray-400 text-lg">Playlist • {singleplaylist?.privacy}</p>
            <p className="text-gray-400 text-lg">{singleplaylist?.songs?.length || 0} tracks</p>
            <p className="text-white text-lg">{singleplaylist?.description}</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 mt-16">
        <h2 className="text-xl font-bold mb-4">Suggestions</h2>
        <div className="grid gap-4">
          {song && song.length > 0 ? (
            song.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-stone-900 p-3 rounded-lg cursor-pointer group hover:bg-[#ffffff2b] transition duration-300"
              >
                <div className="flex items-center w-1/4 gap-5">
                  <div className="relative w-12 h-12 bg-gray-500 rounded-md overflow-hidden">
                    <img className="w-full h-full object-cover" src={item?.image} alt="Song Cover" />
                  </div>
                  <div className="w-3/4">
                    <p className="font-semibold">{item?.name}</p>
                    <p className="text-gray-400">{item?.album}</p>
                  </div>
                </div>

                <div className="flex justify-end items-center space-x-4">
                  <p className="text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </p>
                  <p className="text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </p>

                  <OptionsMenu songId={item._id} />

                  <p className="text-[15px]">{item?.duration || '0:00'}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No songs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePlaylist;
