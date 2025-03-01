import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlaylist, fetchSinglePlaylist, updateImageOnPlaylist } from "../../../store/playlistSlice";
import { listAllSong } from "../../../store/songSlice";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faPen, faPlay, faMinus } from "@fortawesome/free-solid-svg-icons";
import OptionsMenu from "../singleSong/OptionsMenu";
import EditPlaylist from "../playlist/EditPlaylist";

const SinglePlaylist = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleplaylist } = useSelector((state) => state.playlist);
  const { song } = useSelector((state) => state.song);
  const [showEditForm, setShowEditForm] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // State for paginated songs
  const [visibleSongs, setVisibleSongs] = useState(5);
  const songListRef = useRef();

  useEffect(() => {
    if (id) {
      dispatch(fetchSinglePlaylist(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(listAllSong());
  }, [dispatch]);

  // Handle image selection
  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  // Handle file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Update the imageFile state with the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);  // Set the preview image
      };
      reader.readAsDataURL(file); // Read the image file as a data URL for preview
    }
  };

  // Handle image update
  const handleImageUpdate = () => {
    if (imageFile) {
      // Create a new FormData object and append the file data
      const formData = new FormData();
      formData.append('image', imageFile);  // 'image' should match the field expected by the backend
      
      // Dispatch the image update action
      dispatch(updateImageOnPlaylist({ id, playlistData: formData }))
        .then(() => {
          alert("Playlist image updated successfully!");
          dispatch(fetchSinglePlaylist(id)); // Fetch the playlist again to get the updated image
        })
        .catch((error) => {
          alert("Failed to update the playlist image.");
          console.error(error);
        });
    } else {
      alert("Please select an image first.");
    }
  };
  
  // Delete playlist 
  const handleDeletePlaylist = (id) => {
    if (id) {
      dispatch(deletePlaylist(id))
        .then(() => {
          alert("Playlist is deleted successfully");
          window.location.reload(); // Refresh the page
        })
        .catch((error) => {
          console.error("Error deleting playlist:", error);
          alert("Failed to delete playlist");
        });
    }
  };

  // Open edit form modal and send the playlist id
  const handleEditClick = (playlistId) => {
    setShowEditForm(true);
  };

  // Close edit form modal
  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  // Handle submission of updated data
  const handleEditSubmit = (updatedData) => {
    setShowEditForm(false);
  };

  // Load more songs when user scrolls to the bottom
  const handleScroll = () => {
    if (songListRef.current) {
      const bottom = songListRef.current.scrollHeight === songListRef.current.scrollTop + songListRef.current.clientHeight;
      if (bottom) {
        // Load more songs when scrolled to bottom
        setVisibleSongs((prevVisible) => prevVisible + 6);
      }
    }
  };

  return (
    <div className="text-white min-h-screen p-6 flex gap-10">
      {/* Left Section: Fixed Width */}
      <div className="flex-none w-[500px] mt-5">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-gray-800 w-80 h-80 flex items-center justify-center rounded-lg shadow-lg">
            <div className="relative">
              <Link to="#" onClick={handleImageClick}>
                <img
                  className="object-cover shadow-lg bg-indigo-50 text-indigo-600 h-80 w-80 md:h-80 md:w-80" // Removed rounded-full to make it square
                  src={imagePreview || singleplaylist?.image || "https://i0.wp.com/www.endofthreefitness.com/wp-content/uploads/2012/06/band-of-brothers.jpeg?resize=640%2C360&ssl=1"} // Default image or preview
                  alt="Playlist"
                />
                <p className="absolute top-2 right-2 text-sm md:text-lg text-gray-400 bg-gray-800 px-2 py-1 rounded cursor-pointer hover:text-white hover:bg-gray-700 transition">
                  Edit
                </p>
              </Link>

              <input
                type="file"
                id="imageInput"
                onChange={handleFileChange}  // Handle file change event
                accept="image/*"  // Only allow image files
                style={{ display: "none" }}  // Hide the input
              />
            </div>
          </div>

          {/* Save Button: Update Image */}
          {imageFile && (
            <button
              onClick={handleImageUpdate}
              className=" bg-[#1c1c1c] text-white py-2 px-4 rounded"
            >
              Save Image
            </button>
          )}
          
          <div className="text-center ">
            <h1 className="text-3xl font-bold text-white">{singleplaylist?.title}</h1>
            <p className="text-gray-400 text-lg">Playlist • {singleplaylist?.privacy}</p>
            <p className="text-gray-400 text-lg">{singleplaylist?.songs?.length || 0} tracks</p>
            <p className="text-white text-lg">{singleplaylist?.description}</p>

            <div className="flex items-center space-x-8 ml-10 mt-5">
              {/* Pencil Icon: Open edit form and send the id */}
              <button 
                onClick={() => handleEditClick(id)}
                className="bg-[#1c1c1c] w-10 h-10 rounded-full flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faPen} className="text-white w-4 h-4" />
              </button>

              {/* Play Icon */}
              <button className="bg-white w-12 h-12 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faPlay} className="text-black w-6 h-6" />
              </button>

              {/* Minus Icon (Delete) */}
              <button 
                onClick={() => handleDeletePlaylist(id)} 
                className="bg-[#1c1c1c] w-10 h-10 rounded-full flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faMinus} className="text-white w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Right Section: Suggestions */}
      <div className="flex-1 mt-16">
        <h2 className="text-xl font-bold mb-4 mt-3">Suggestions</h2>
        <div
          className="grid gap-4 overflow-y-auto"
          style={{ maxHeight: "500px" }}
          ref={songListRef}
          onScroll={handleScroll}
        >
          {song && song.length > 0 ? (
            song.slice(0, visibleSongs).map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-stone-900 p-3 rounded-lg cursor-pointer group hover:bg-[#ffffff2b] transition duration-300"
              >
                <div className="flex items-center w-1/4 gap-5">
                  <div className="relative w-12 h-12 bg-gray-500 rounded-md overflow-hidden">
                    <img className="w-full h-full object-cover" src={item?.image} alt="Song Cover" />
                  </div>
                  <div className="w-3/4">
                    <p className="font-semibold">{item?.name}</p>
                    <p className="text-gray-400">{item?.album}</p>
                  </div>
                </div>
                <div className="flex justify-end items-center space-x-4">
                  <p className="text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FontAwesomeIcon icon={faThumbsUp} />
                  </p>
                  <p className="text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FontAwesomeIcon icon={faThumbsDown} />
                  </p>
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

      {/* Conditionally render EditPlaylist modal at the bottom */}
      {showEditForm && (
        <EditPlaylist
          id={id}
          playlistData={singleplaylist}
          onClose={handleCloseEditForm}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default SinglePlaylist;
