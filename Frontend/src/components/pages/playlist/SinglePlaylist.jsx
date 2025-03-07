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

  const handleScroll = () => {
    if (songListRef.current) {
      const bottom = songListRef.current.scrollHeight === songListRef.current.scrollTop + songListRef.current.clientHeight;
      if (bottom) {
        setVisibleSongs((prevVisible) => prevVisible + 6);
      }
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

      <div className="flex-1 mt-16">
        <h2 className="text-xl font-bold mb-4 mt-3">Playlist Songs</h2>

        <div className="grid gap-4 mb-6">
          {singleplaylist?.songs?.length > 0 ? (
            singleplaylist.songs.map((item) => (
              <div key={item._id} className="relative flex items-center bg-stone-900 p-3 rounded-lg">
  <div className="relative w-12 h-12 bg-gray-500 rounded-md overflow-hidden group">
    <img className="w-full h-full object-cover" src={item?.image} alt="Song Cover" />
    
    {/* Play/Pause Icon */}
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button onClick={() => handleSelectSong(item)} className="text-white text-xl">
        {currentSong?._id === item._id && isPlaying ? "⏸" : "▶"}
      </button>
    </div>
  </div>

  <div className="ml-4 w-full">
    <Link to={`/singleSong/${item._id}`}><p className="font-semibold text-white hover:underline white">{item?.name}</p></Link>
    <p className="text-gray-400">{item?.album}</p>
  </div>
</div>

     

            ))
          ) : (
            <p className="text-gray-400">No songs available in this playlist.</p>
          )}
        </div>

        {/* Suggestions */}
        <h2 className="text-xl font-bold mb-4 mt-3">Suggestions</h2>
        <div className="grid gap-4 overflow-y-auto" style={{ maxHeight: "500px" }} ref={songListRef} onScroll={handleScroll}>
  {song && song.length > 0 ? (
    song.slice(0, visibleSongs).map((item) => (
      <div key={item._id} className="flex justify-between items-center bg-stone-900 p-3 rounded-lg cursor-pointer group hover:bg-[#ffffff2b] transition duration-300">
        <Link to={`/singleSong/${item._id}`} className="flex items-center w-1/4 gap-5">
          <div className="relative w-12 h-12 bg-gray-500 rounded-md overflow-hidden">
            <img className="w-full h-full object-cover" src={item?.image} alt="Song Cover" />
          </div>
          <div className="w-3/4">
            <p className="font-semibold hover:underline text-white">{item?.name}</p>
            <p className="text-gray-400">{item?.album}</p>
          </div>
        </Link>
        <div className="flex justify-end items-center space-x-4">
          <p className="text-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button onClick={() => handleLike(item._id)} className="text-white ml-4">
                  <FontAwesomeIcon icon={faThumbsUp} />
                </button>
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

      {/* Player Component */}
      <Player />

      {showEditForm && (
        <EditPlaylist id={id} playlistData={singleplaylist} onClose={handleCloseEditForm} />
      )}
    </div>
  );
};

export default SinglePlaylist;
