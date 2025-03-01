import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listSingleAlbum, updateAlbum } from '../../store/albumSlice';
import { STATUS } from '../../globals/components/Status';

const EditAlbum = () => {
  const { id } = useParams();
  console.log(id)
  const dispatch = useDispatch();
  const { singleAlbum, status } = useSelector((state) => state.album);
  const [albumData, setAlbumData] = useState({
    name: "",
    desc: "",
    bgColour: "",
    image: null
  });

  useEffect(() => {
    if (id) {
      dispatch(listSingleAlbum(id));
    }
  }, [id, dispatch]);

  console.log(singleAlbum)


  // prevoius data came on the singleAlbum and set in the setAlbumData usestate
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

  //handle change
  const handleChange = (e) => {
    const { name, files, value } = e.target;
    setAlbumData({
        ...albumData,
        [name]: name === "image" ? files[0] : value,
    });
};


//when click to the save button the handlesubmit button trigger
  const handleSubmit=async(e)=>{
    e.preventDefault();
    dispatch(updateAlbum({id, albumData}))
    .then(() => {
          if (status === STATUS.SUCCESS) {
            alert("Successfully updated the album");
          } else {
            alert("Failed to update album");
          }
        });
    
  }

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <div className="flex items-start justify-center flex-1 bg-stone-900">
          <form onSubmit={handleSubmit}
            className="flex flex-col items-start bg-stone-800 px-12 py-12 rounded-lg shadow-lg mt-2 mx-5 relative w-full md:w-[600px]"
         >
            {/* Profile Image Upload */}
            <div className="relative mb-6">
              <label className="cursor-pointer">
                <img
                  className="object-cover rounded-full shadow-lg bg-indigo-50 text-indigo-600 h-40 w-40 md:h-56 md:w-56"
                  src={
                    albumData.image && albumData.image instanceof File
                      ? URL.createObjectURL(albumData.image)
                      : singleAlbum?.image
                  }
                  alt="Profile"
                />
                <input
                  name="image"
                  onChange={handleChange}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>
              <p className="absolute top-2 right-2 text-sm md:text-lg text-gray-400 bg-gray-800 px-2 py-1 rounded cursor-pointer hover:text-white hover:bg-gray-700 transition">
                Upload
              </p>
            </div>

            {/* Album Name */}
            <div className="text-left ml-4 mt-2 w-full">
              <input
                name="name"
                type="text"
                value={albumData.name}
                onChange={handleChange}
                className="text-4xl  text-gray-200 font-bold bg-transparent focus:outline-none focus:border-indigo-400 ml-5 py-1 leading-tight w-full"
              />
            </div>

            {/* Album Description */}
            <div className="text-left ml-4 mt-2 w-full">
              <input
                name="desc"
                type="text"
                value={albumData.desc}
                onChange={handleChange}
                className="text-lg text-gray-200 font-bold bg-transparent focus:outline-none focus:border-indigo-400 py-1 leading-tight w-full border-b-2 border-gray-600 focus:border-indigo-400"
              />
            </div>

            {/* Background Color */}
            <div className="text-left ml-4 mt-4 w-full">
              <label className="text-gray-200 text-lg">Background Color:</label>
              <input
                name="bgColour"
                type="color"
                value={albumData.bgColour}
                onChange={handleChange}
                className="w-16 h-10 mt-10 ml-5"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="absolute bottom-16 right-4 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAlbum;
