import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import AllPlaylist from "../playlist/AllPlaylist";

const Library = () => {
  return (
    <div className="flex gap-10 p-10">
      {/* Liked music Playlist */}
      <Link
        to="/likeSong"
        className="flex flex-col p-4 rounded-lg bg-gradient-to-br from-purple-600 to-blue-400 w-40 h-40 justify-between"
      >
        <FontAwesomeIcon icon={faThumbsUp} className="text-white text-6xl" />
        <div>
          <p className="text-white font-semibold">Liked music</p>
          <p className="text-gray-300 text-sm">Auto playlist</p>
        </div>
      </Link>

      {/* Episodes for later Playlist */}
      <Link
        to="/saveLateral"
        className="flex flex-col p-4 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-400 w-40 h-40 justify-between"
      >
        <FontAwesomeIcon icon={faBookmark} className="text-white text-3xl" />
        <div>
          <p className="text-white font-semibold">Song for later</p>
          <p className="text-gray-300 text-sm">Song that you save for later</p>
        </div>
      </Link>
    </div>
  );
};

export default Library;
