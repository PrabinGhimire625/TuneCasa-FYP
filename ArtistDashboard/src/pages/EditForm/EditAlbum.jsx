import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listSingleAlbum, updateAlbum } from '../../store/albumSlice';
import { STATUS } from '../../globals/components/Status';
import { toast } from 'react-toastify';

const EditAlbum = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { singleAlbum, status } = useSelector((state) => state.album);
  const [albumData, setAlbumData] = useState({
    name: "",
    desc: "",
    bgColour: "#000000", // Default background color for dark theme
    image: null
  });

  useEffect(() => {
    if (id) {
      dispatch(listSingleAlbum(id));
    }
  }, [id, dispatch]);

  // Pre-populate the form with album data when available
  useEffect(() => {
    if (singleAlbum) {
      setAlbumData({
        name: singleAlbum.name,
        desc: singleAlbum.desc,
        bgColour: singleAlbum.bgColour,
        image: singleAlbum.image,
      });
    }
  }, [singleAlbum]);

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    setAlbumData({
      ...albumData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateAlbum({ id, albumData }))
      .then(() => {
        if (status === STATUS.SUCCESS) {
          toast.success("Album edited");
          navigate("/list-album");

        } else {
          toast.error("Something went wrong");
        }
      });
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-900 p-16 rounded-xl shadow-lg w-full max-w-4xl relative"
      >
        {/* Profile Image Upload */}
        <div className="relative mb-10">
          <label className="cursor-pointer">
            <img
              className="object-cover rounded-full shadow-xl h-64 w-64 md:h-72 md:w-72 border-4 border-indigo-100 group-hover:scale-105 transition-transform duration-300"
              src={
                albumData.image && albumData.image instanceof File
                  ? URL.createObjectURL(albumData.image)
                  : singleAlbum?.image
              }
              alt="Album Cover"
            />
            <input
              name="image"
              onChange={handleChange}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
          <p className="absolute top-2 right-2 text-sm text-gray-300 bg-gray-800 px-2 py-1 rounded cursor-pointer hover:text-white hover:bg-gray-700 transition">
            Upload
          </p>
        </div>

        {/* Album Name */}
        <div className="text-left mb-6 w-full">
          <input
            name="name"
            type="text"
            value={albumData.name}
            onChange={handleChange}
            className="text-4xl text-gray-200 font-semibold bg-transparent focus:outline-none focus:border-indigo-500 px-6 py-3 rounded-lg w-full border-b-2 border-gray-600 focus:border-indigo-500"
            placeholder="Album Name"
          />
        </div>

        {/* Album Description */}
        <div className="text-left mb-6 w-full">
          <textarea
            name="desc"
            value={albumData.desc}
            onChange={handleChange}
            className="text-lg text-gray-200 bg-transparent focus:outline-none focus:border-indigo-500 px-6 py-3 rounded-lg w-full border-b-2 border-gray-600 focus:border-indigo-500"
            placeholder="Album Description"
          />
        </div>

        {/* Background Color */}
        <div className="text-left mb-8 w-full">
          <label className="text-gray-200 text-lg">Background Color:</label>
          <input
            name="bgColour"
            type="color"
            value={albumData.bgColour}
            onChange={handleChange}
            className="w-16 h-10 mt-4 ml-5"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="absolute bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditAlbum;
