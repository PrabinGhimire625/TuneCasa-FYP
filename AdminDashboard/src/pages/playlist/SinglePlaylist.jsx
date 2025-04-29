import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlaylist, fetchSinglePlaylist, updateImageOnPlaylist } from "../../../store/playlistSlice";
import { listAllSong } from "../../../store/songSlice";
import { setCurrentSong, playPause } from "../../../store/playerSlice";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown, faPen, faPlay, faMinus } from "@fortawesome/free-solid-svg-icons";
import OptionsMenu from "../singleSong/OptionsMenu";
import EditPlaylist from "../playlist/EditPlaylist";
import Player from "../player/Player";
import { addLike } from "../../../store/likeSlice";
import { assets } from "../../../assets/frontend-assets/assets";

const SinglePlaylist = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleplaylist } = useSelector((state) => state.playlist);
  const { song } = useSelector((state) => state.song);
  const { currentSong, isPlaying } = useSelector((state) => state.player);

  const [showEditForm, setShowEditForm] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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

  // Handle image selection and update
  const handleImageClick = () => document.getElementById("imageInput").click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpdate = () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      dispatch(updateImageOnPlaylist({ id, playlistData: formData }))
        .then(() => {
          alert("Playlist image updated successfully!");
          dispatch(fetchSinglePlaylist(id));
        })
        .catch((error) => {
          alert("Failed to update the playlist image.");
          console.error(error);
        });
    } else {
      alert("Please select an image first.");
    }
  };

  const handleDeletePlaylist = (id) => {
    if (id) {
      dispatch(deletePlaylist(id))
        .then(() => {
          alert("Playlist deleted successfully");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error deleting playlist:", error);
          alert("Failed to delete playlist");
        });
    }
  };

  const handleEditClick = () => setShowEditForm(true);

  const handleCloseEditForm = () => setShowEditForm(false);

  const handleSelectSong = (songItem) => {
    if (currentSong?._id === songItem._id) {
      dispatch(playPause());
    } else {
      dispatch(setCurrentSong(songItem));
      setTimeout(() => dispatch(playPause(true)), 200);
    }
  };



  // Handle thumbs up click
  const handleLike = (songId) => {
    if (songId) {
      dispatch(addLike({ songId }))
        .then(() => {
          alert("Song is successfully liked");
        })
        .catch((error) => {
          alert("Song is not liked");
          console.error(error);
        });
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false); 

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearching(e.target.value !== ""); 
  };

  const filteredSongs = song.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("singleplaylist", singleplaylist)

  return (
    <div className="text-white min-h-screen p-6 flex gap-10">
      {/* Left Section: Fixed Width */}
      <div className="flex-none w-[500px] mt-5">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-gray-800 w-80 h-80 flex items-center justify-center rounded-lg shadow-lg">
            <div className="relative">
              <Link to="#" onClick={handleImageClick}>
                <img
                  className="object-cover shadow-lg bg-indigo-50 text-indigo-600 h-80 w-80"
                  src={imagePreview || singleplaylist?.image || "https://i0.wp.com/www.endofthreefitness.com/wp-content/uploads/2012/06/band-of-brothers.jpeg?resize=640%2C360&ssl=1"}
                  alt="Playlist"
                />
                <p className="absolute top-2 right-2 text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded cursor-pointer hover:text-white hover:bg-gray-700 transition">
                  Edit
                </p>
              </Link>
              <input
                type="file"
                id="imageInput"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
          </div>

          {imageFile && (
            <button onClick={handleImageUpdate} className="bg-[#1c1c1c] text-white py-2 px-4 rounded">
              Save Image
            </button>
          )}

          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">{singleplaylist?.title}</h1>
            <div className="flex items-center gap-2 text-gray-400 text-lg justify-center">
              <p>{singleplaylist?.privacy}</p>
              <span className="text-3xl leading-none">•</span>
              <p>{singleplaylist?.songs?.length || 0} tracks</p>
            </div>

            <p className="text-white text-lg">{singleplaylist?.description}</p>

            <div className="flex items-center space-x-8 ml-10 mt-5">
              <button onClick={handleEditClick} className="bg-[#1c1c1c] w-10 h-10 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faPen} className="text-white w-4 h-4" />
              </button>

              <button onClick={() => handleSelectSong(singleplaylist?.songs[0])} className="bg-white w-12 h-12 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faPlay} className="text-black w-6 h-6" />
              </button>

              <button onClick={() => handleDeletePlaylist(id)} className="bg-[#1c1c1c] w-10 h-10 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faMinus} className="text-white w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-4">
        {/* playlist song */}
        <h2 className="text-xl font-bold mb-4 mt-3">Playlist Songs</h2>
        <div className="grid gap-4 mb-6">
        {singleplaylist?.songs?.length > 0 ? (
  singleplaylist.songs.map((item) => (
    <div key={item._id} className="relative flex items-center p-2 rounded-lg group hover:bg-[#ffffff2b] transition duration-300">
      
      {/* Song Image + Play Button on Hover */}
      <div className="relative w-10 h-10 bg-gray-500 rounded-md overflow-hidden group">
        <img className="w-full h-full object-cover" src={item?.image} alt="Song Cover" />

        {/* Play/Pause Icon (Visible on Hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={() => handleSelectSong(item)} className="text-white text-xl">
            {currentSong?._id === item._id && isPlaying ? "⏸" : "▶"}
          </button>
        </div>
      </div>

      {/* Song Details */}
      <div className="ml-4 flex-1">
        <Link to={`/singleSong/${item._id}`}>
          <p className="font-semibold text-white hover:underline">{item?.name}</p>
        </Link>
        <p className="text-gray-400">{item?.album}</p>
      </div>

      {/* Actions (Hidden by Default, Shown on Hover) */}
      <div className="relative z-10 flex items-center space-x-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300">
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
  <p className="text-gray-400">No songs available in this playlist.</p>
)}

        </div>


        {/* Suggestions */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-4 ">Let's find something for your playlist</h2>

          {/* Search Bar */}
          <div className="flex items-center gap-3  cursor-pointer my-8">
            <input
              type="text"
              placeholder="Search for a song"
              className="w-96 bg-stone-800 p-2 border-white rounded-md text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Song List */}
          <div
            className="grid gap-4 overflow-y-auto"
            style={{ maxHeight: "500px" }}
            ref={songListRef}
          >
           {searchQuery ? (
  filteredSongs.length > 0 ? (
    filteredSongs.map((item) => (
      <div
        key={item._id}
        className="flex justify-between items-center bg-stone-900 p-3 rounded-lg cursor-pointer group hover:bg-[#ffffff2b] transition duration-300"
      >
        <Link
          to={`/singleSong/${item._id}`}
          className="flex items-center w-1/4 gap-5"
        >
            {/* Song Image + Play Button on Hover */}
      <div className="relative w-10 h-10 bg-gray-500 rounded-md overflow-hidden group">
        <img className="w-full h-full object-cover" src={item?.image} alt="Song Cover" />

        {/* Play/Pause Icon (Visible on Hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={() => handleSelectSong(item)} className="text-white text-xl">
            {currentSong?._id === item._id && isPlaying ? "⏸" : "▶"}
          </button>
        </div>
      </div>

          <div className="w-3/4">
            <p className="font-semibold hover:underline text-white">
              {item?.name}
            </p>
            <p className="text-gray-400">{item?.album}</p>
          </div>
        </Link>

        {/* Initially hidden, only shown on hover */}
{/* Initially hidden, only shown on hover */}
<div className="relative z-10 flex justify-end items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
  <button onClick={() => handleLike(item._id)} className="text-white ml-4">
    <FontAwesomeIcon icon={faThumbsUp} />
  </button>
  <FontAwesomeIcon icon={faThumbsDown} className="text-[15px]" />

  {/* Wrap OptionsMenu in a container with absolute positioning */}
  <div className="relative">
    <OptionsMenu songId={item._id} />
  </div>

  <p className="text-[15px]">{item?.duration || "0:00"}</p>
</div>


      </div>
    ))
  ) : (
    <p className="text-gray-400">No songs found.</p>
  )
) : null}


          </div>

        </div>


      </div>

      {/* Player Component */}
      {/* <Player /> */}

 
    </div>
  );
};

export default SinglePlaylist;
