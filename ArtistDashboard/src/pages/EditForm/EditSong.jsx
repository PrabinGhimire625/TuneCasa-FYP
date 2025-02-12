import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listSingleSong, updateSong } from "../../store/songSlice";
import { STATUS } from "../../globals/components/Status";

const EditSong = () => {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const { singleSong, status } = useSelector((state) => state.song);
  const [songData, setSongData]=useState({
    image:null,
    name:"",
    desc:""
  })

  useEffect(()=>{
    if(id){
      dispatch(listSingleSong(id));
    }
  },[id, dispatch])

  
    // prevoius data came on the singleAlbum and set in the setAlbumData usestate
    useEffect(() => {
      if (singleSong) {
        setSongData({
          image:singleSong.image,
          name:singleSong.name,
          desc: singleSong.desc
        });
      }
    }, [singleSong]);


  const handleChange=(e)=>{
    const {name, value, files}=e.target
    setSongData({
      ...songData,
      [name]: name === "image" ? files[0] : value,
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    dispatch(updateSong({id, songData}))
    .then(()=>{
      if(status===STATUS.SUCCESS){
        alert("Successfull edit the song")
      }else{
        alert("Failed to update song")
      }
    })

  }

  console.log(singleSong)

  return (
    <div className="min-h-screen flex  justify-center bg-black">
      <div className="w-full max-w-2xl  rounded-lg shadow-lg p-6 md:p-12">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="relative flex flex-col items-center">
            <label className="cursor-pointer">
              <img
                className="object-cover rounded-full shadow-lg bg-indigo-50 text-indigo-600 h-32 w-32 md:h-40 md:w-40"
                src={
                  songData.image && songData.image instanceof File
                    ? URL.createObjectURL(songData.image)
                    : singleSong?.image
                }
                alt="Profile"
              />
              <input  name='image' type="file" accept="image/*" className="hidden"   onChange={handleChange}/>
            </label>
          </div>

          {/* song Name */}
          <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Song Name</label>
            <input
              name="name"
              type="text"
              value={songData.name}
              onChange={handleChange}
              className="text-lg text-gray-200 font-semibold bg-transparent border-b border-gray-500 focus:outline-none focus:border-indigo-400 py-2 w-full"
            />
          </div>

           {/* song desc */}
           <div className="flex flex-col">
            <label className="text-gray-400 text-sm">Song Description</label>
            <input
              name="desc"
              type="text"
              value={songData.desc}
              onChange={handleChange}
              className="text-lg text-gray-200 font-semibold bg-transparent border-b border-gray-500 focus:outline-none focus:border-indigo-400 py-2 w-full"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 rounded-lg transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSong;
