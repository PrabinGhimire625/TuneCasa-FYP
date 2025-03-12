// // AdPlayer.js
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { playPause, playNext, playPrev, playAd, stopAd } from "../../../store/playerSlice";
// import { getAdsForFreeUsers } from "../../../store/adsSlice";

// const AdPlayer = () => {
//   const dispatch = useDispatch();
//   const {adsForFreeUsers } = useSelector((state) => state.ads);
//   const { isPlaying, currentSong, songList, isAdPlaying, currentAd  } = useSelector((state) => state.player);
//   console.log("currentAd", currentAd)
//   console.log("isplaying", isAdPlaying)
//   console.log("adsForFreeUsers" , adsForFreeUsers)
  
//   useEffect(() => {
//     // Fetch ads when the component mounts
//     dispatch(getAdsForFreeUsers());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!isAdPlaying || !currentAd) return;

//     // Function to handle the end of the ad
//     const handleAdEnd = () => {
//       dispatch(stopAd());  // Stop the ad
//       dispatch(playNext());  // Play the next song
//     };

//     // Assuming `currentAd` has an audio file to be tracked
//     const adElement = document.querySelector(".ad-player audio");
//     adElement?.addEventListener("ended", handleAdEnd);

//     return () => {
//       adElement?.removeEventListener("ended", handleAdEnd);
//     };
//   }, [dispatch, isAdPlaying, currentAd]);

//   useEffect(() => {
//     // Play ad before the next song starts
//     if (!isPlaying && currentSong && songList.length > 0 && !isAdPlaying) {
//       dispatch(playAd());  // Trigger ad
//     }
//   }, [dispatch, isPlaying, currentSong, songList, isAdPlaying]);

//   if (!isAdPlaying || !currentAd) return null; // If no ad is playing, return nothing

//     console.log("Current Ad", currentAd)
//   return (
//     <div className="ad-player">
//       <audio src={currentAd.file} controls autoPlay />
//       {/* Add controls for skipping, ad interactions, etc. */}
//     </div>
//   );
// };

// export default AdPlayer;
