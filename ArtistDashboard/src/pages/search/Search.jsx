import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp, faPlay } from "@fortawesome/free-solid-svg-icons";
import { searchSongAlbumArtist } from "../../store/searchSlice";
import { STATUS } from "../../globals/components/Status";


const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("query");
  const { songs, albums, status } = useSelector((state) => state.search);

  useEffect(() => {
    if (query?.trim()) {
      dispatch(searchSongAlbumArtist(query));
    }
  }, [query, dispatch]);

  return (
    <div className="text-white px-4 md:px-8 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {query ? (
          <>
            <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>

            {status === STATUS.LOADING && <p className="text-white">Loading...</p>}
            {status === STATUS.ERROR && (
              <p className="text-red-500">Something went wrong. Please try again later.</p>
            )}

            {status === STATUS.SUCCESS && (
              <>
                {/* Songs */}
                {songs.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Songs</h2>
                    <div className="flex flex-col gap-6">
                      {songs.map((song, index) => (
                        <div
                          key={song._id}
                          className="flex justify-between items-center p-3 rounded-lg shadow-[0_0_10px_2px_rgba(255,255,255,0.1)] hover:bg-gray-800 transition-all duration-200 group"
                        >
                          {/* Left */}
                          <Link to={`/singleSong/${song._id}`} className="flex items-center gap-3 w-1/3">
                            <span className="w-6 text-center text-sm text-gray-400">{index + 1}</span>
                            <div className="relative w-10 h-10 rounded-md overflow-hidden">
                              <img
                                className="w-full h-full object-cover"
                                src={song.image || "https://via.placeholder.com/40"}
                                alt="Song Thumbnail"
                              />

                              {/* Pause icon centered on image */}
                              <div className="absolute inset-0 flex items-center justify-center text-white">
                                <FontAwesomeIcon icon={faPlay} className="text-lg" />
                              </div>

                              {/* Play button on hover */}
                              <button className="absolute inset-0 flex items-center justify-center shadow-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <i className="fas fa-play"></i>
                              </button>
                            </div>

                            <span className="text-white hover:underline text-sm md:text-base">{song.name}</span>
                          </Link>

                          {/* Middle */}
                          <div className="hidden sm:flex justify-between items-center text-sm w-1/3 pr-6">
                            <p className="truncate text-gray-400">{song.album}</p>
                            <p className="text-sm text-gray-400">{song.duration}</p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center space-x-4 w-1/3 justify-end pr-2 sm:pr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <FontAwesomeIcon icon={faThumbsUp} className="cursor-pointer hover:text-white" />
                            <FontAwesomeIcon icon={faThumbsDown} className="cursor-pointer hover:text-white" />

                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                )}

                {/* Albums */}
                {albums.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Albums</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                      {albums.map((album) => (
                        <div
                          key={album._id}
                          className="flex flex-col items-center text-center group rounded-lg overflow-hidden transition duration-300 shadow-md hover:shadow-lg hover:bg-[#1a1a1a]"
                        >
                          <Link to={`/album/${album?.name}`} className="w-full">
                            <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 overflow-hidden cursor-pointer rounded-md transition duration-300 group">
                              <img
                                src={album.image || "https://via.placeholder.com/150"}
                                alt={album.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          </Link>
                          <h3 className="mt-3 text-sm md:text-base font-medium truncate w-full px-2 text-gray-100 transition duration-300 hover:underline">
                            {album.name}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {songs.length === 0 && albums.length === 0 && artists.length === 0 && (
                  <p className="text-white text-lg">No results found for "{query}"</p>
                )}
              </>
            )}
          </>
        ) : (
          <p className="text-white text-lg">Please enter a search query.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
