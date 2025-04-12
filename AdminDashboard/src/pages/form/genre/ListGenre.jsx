import React, { useEffect, useState } from 'react';
import { deleteGenre, listAllGenre } from '../../../store/genreSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const ListGenre = () => {
  const dispatch = useDispatch();
  const { genre } = useSelector((state) => state.genre);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(listAllGenre());
  }, [dispatch]);

  const handleDeleteGenre = (genreId) => {
    if (window.confirm("Are you sure you want to delete this genre?")) {
      dispatch(deleteGenre(genreId));
    }
  };

  const filteredGenres = genre.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white px-6 py-8 w-full">
      <h3 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-3">🎵 Genre List</h3>

      {/* Search */}
      <div className="mb-6 relative max-w-xl">
        <input
          type="text"
          placeholder="Search genres..."
          className="w-full py-2 pl-10 pr-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute top-2.5 left-3 text-gray-400 w-5 h-5" />
      </div>

      {/* List */}
      {filteredGenres.length > 0 ? (
        <div className="w-full space-y-4">
          {filteredGenres.map((genreItem, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between  p-4 rounded-xl hover:bg-gray-700 transition-all duration-200 shadow-lg"
            >
              <Link to={`/editGenre/${genreItem._id}`} className="flex items-center gap-4 w-full">
                <div
                  className="w-16 h-16 rounded-md border border-white/20 shadow-inner"
                  style={{ backgroundColor: genreItem?.bgColour }}
                />
                <div className="flex flex-col">
                  <h4 className="text-lg font-semibold">{genreItem?.name}</h4>
                  <p className="text-sm text-gray-300 line-clamp-2">{genreItem?.desc}</p>
                </div>
              </Link>

              <button
                onClick={() => handleDeleteGenre(genreItem._id)}
                className="ml-4 px-3 py-1.5  hover:bg-red-700 text-sm rounded-md font-medium text-white transition-all"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 py-12">
          {searchTerm ? "No genres match your search." : "No genres available. Try adding some!"}
        </div>
      )}
    </div>
  );
};

export default ListGenre;
