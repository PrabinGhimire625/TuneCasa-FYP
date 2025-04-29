import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listSingleSong, updateSong } from "../../store/songSlice";
import { STATUS } from "../../globals/components/Status";
import { toast } from "react-toastify";

const EditSong = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleSong, status } = useSelector((state) => state.song);

  const [songData, setSongData] = useState({
    image: null,
    file: null,
    name: "",
    desc: ""
  });

  useEffect(() => {
    if (id) {
      dispatch(listSingleSong(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleSong) {
      setSongData({
        image: singleSong.image,
        name: singleSong.name,
        desc: singleSong.desc
      });
    }
  }, [singleSong]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedData = {
      ...songData,
      [name]: name === "image" || name === "file" ? files[0] : value
    };
    setSongData(updatedData);

    if (name === "image" || name === "file") {
      dispatch(updateSong({ id, songData: updatedData }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSong({ id, songData }))
      .then(() => {
        if (status === STATUS.SUCCESS) {
          toast.success("Successfully updated the song");
        } else {
          toast.error("Failed to update song");
        }
      });
  };

  return (
    <div className=" flex justify-center items-center  px-4 py-8">
      <div className="w-full max-w-4xl rounded-2xl shadow-2xl bg-gray-850 p-8 md:p-14 border border-gray-700">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="relative flex flex-col items-center">
            <label className="cursor-pointer group">
              <img
                className="object-cover rounded bg-gray-800 h-48 w-48 md:h-56 md:w-56 border-1 group-hover:scale-105 transition-transform duration-300"
                src={
                  songData.image && songData.image instanceof File
                    ? URL.createObjectURL(songData.image)
                    : singleSong?.image
                }
                alt="Song Cover"
              />


              <input
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
              />
              <p className="mt-2 text-xs text-gray-400 group-hover:text-indigo-400 transition-colors">Click to change cover image</p>
            </label>
          </div>

          {/* Song Name */}
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm mb-1">Song Name</label>
            <input
              name="name"
              type="text"
              value={songData.name}
              onChange={handleChange}
              className="text-lg text-white font-medium bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>

          {/* Song Description */}
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm mb-1">Song Description</label>
            <input
              name="desc"
              type="text"
              value={songData.desc}
              onChange={handleChange}
              className="text-lg text-white font-medium bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>

          {/* Audio File Upload */}
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm mb-1">Upload New Audio File</label>
            <input
              name="file"
              type="file"
              accept="audio/*"
              className="text-sm text-gray-300 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSong;
