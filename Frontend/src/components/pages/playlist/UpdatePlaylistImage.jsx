import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateImageOnPlaylist } from "../../../store/playlistSlice";

function UpdatePlaylistImage({ playlistId }) {
  const [image, setImage] = useState(null);  
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);  
    }
  };


  const handleImageUpdate = () => {
    if (image) {
      dispatch(updateImageOnPlaylist({ id: playlistId, imageFile: image }));
      alert("Playlist image updated successfully!");
    } else {
      alert("Please select an image first.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        onChange={handleFileChange}  
        accept="image/*"  
        className="mt-3 mb-4"
      />
      <button
        onClick={handleImageUpdate} 
        className="bg-[#1c1c1c] text-white py-2 px-4 rounded"
      >
        Update Playlist Image
      </button>
    </div>
  );
}

export default UpdatePlaylistImage;
