import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const songListRef = useRef(null);

  // Filter songs based on search input
  const filteredSongs = song.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 mt-3">Suggestions</h2>

      {/* Search Bar */}
      <div className="flex items-center gap-3 pl-8 cursor-pointer">
        <input
          type="text"
          placeholder="Search"
          className="w-96 bg-stone-800 p-2 border-white rounded-md text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <img className="w-6" src={assets.search_icon} alt="" />
      </div>

      {/* Song List */}
      <div
        className="grid gap-4 overflow-y-auto"
        style={{ maxHeight: "500px" }}
        ref={songListRef}
      >
        {filteredSongs.length > 0 ? (
          filteredSongs.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center bg-stone-900 p-3 rounded-lg cursor-pointer group hover:bg-[#ffffff2b] transition duration-300"
            >
              <Link
                to={`/singleSong/${item._id}`}
                className="flex items-center w-1/4 gap-5"
              >
                <div className="relative w-12 h-12 bg-gray-500 rounded-md overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={item?.image}
                    alt="Song Cover"
                  />
                </div>
                <div className="w-3/4">
                  <p className="font-semibold hover:underline text-white">
                    {item?.name}
                  </p>
                  <p className="text-gray-400">{item?.album}</p>
                </div>
              </Link>

              <div className="flex justify-end items-center space-x-4">
                <button onClick={() => handleLike(item._id)} className="text-white ml-4">
                  <FontAwesomeIcon icon={faThumbsUp} />
                </button>
                <FontAwesomeIcon icon={faThumbsDown} className="text-[15px]" />
                <OptionsMenu songId={item._id} />
                <p className="text-[15px]">{item?.duration || "0:00"}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No songs found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
