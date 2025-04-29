import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deleteAlbum, listAllAlbumOfArtist } from "../../store/albumSlice"
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Importing icons
import { toast } from 'react-toastify';

const ListAlbum = () => {
  const dispatch = useDispatch();
  const { albumOfArtist } = useSelector((state) => state.album);

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(listAllAlbumOfArtist());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (id) {
      dispatch(deleteAlbum(id));
      toast.success("Album deleted")
    } else {
      toast.error("Something went wrong");
    }
  }

  // Filter albums based on the search query
  const filteredAlbums = albumOfArtist?.filter((album) =>
    album.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='text-white'>
      <div className="flex justify-between items-center mb-6">
        <p className='font-bold text-2xl text-white'>All Albums</p>

        {/* Search Bar */}
        <div className="flex-grow mx-4 max-w-sm">
          <input
            type="text"
            placeholder="Search albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-black rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:bg-gray-700 focus:text-white"
          />
        </div>

        {/* Add Album Button */}
        <Link
          to="/add-album"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200 mr-5"
        >
          + Add Album
        </Link>
      </div>

      {/* Table Header */}
      <div className='hidden sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-4 p-4 border border-gray-700 text-sm bg-gray-800 text-gray-300 rounded'>
        <b>Image</b>
        <b>Name</b>
        <b>Description</b>
        <b>Background</b>
        <b>Actions</b>
      </div>

      {/* Album List */}
      {filteredAlbums && filteredAlbums.length > 0 ? (
        filteredAlbums.map((item, index) => (
          <div
            key={index}
            className='grid sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] grid-cols-1 sm:items-center gap-4 p-6 border-b border-gray-600 text-sm text-gray-200 hover:bg-gray-900 transition-all'
          >
            <Link to={`/album/${encodeURIComponent(item?.name)}`} className="contents">
              <img className='w-16 h-16 object-cover rounded cursor-pointer' src={item?.image} alt={item?.name} />
              <p className="cursor-pointer">{item?.name}</p>
              <p className="cursor-pointer">{item?.desc}</p>
              <div
                className="w-10 h-6 rounded"
                style={{ backgroundColor: item?.bgColour }}
                title={item?.bgColour}
              />
            </Link>

            {/* Actions - Edit and Delete Icons together */}
            <div className="flex gap-2 justify-start items-center">
              {/* Edit Icon */}
              <Link
                to={`/editAlbum/${item._id}`}
                className="text-blue-500 hover:text-blue-700 text-lg"
                title="Edit"
              >
                <FiEdit />
              </Link>

              {/* Delete Icon */}
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 hover:text-red-700 text-lg"
                title="Delete"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 mt-6">No albums found.</p>
      )}
    </div>
  )
}

export default ListAlbum;
