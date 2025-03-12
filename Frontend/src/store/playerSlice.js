import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  isPlaying: false,
  progress: 0,
  songList: [],
  currentAd: null, // Track the current ad
  isAdPlaying: false, // True when an ad is playing
  adList: [], // List of ads
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    playPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    updateProgress: (state, action) => {
      state.progress = action.payload;
    },
    stopPlayer: (state) => {
      state.currentSong = null;
      state.isPlaying = false;
      state.progress = 0;
    },
    setSongList: (state, action) => {
      state.songList = action.payload;
    },

    playNext: (state) => {
      if (!state.currentSong || state.songList.length === 0) return;
  
      const currentIndex = state.songList.findIndex(song => song._id === state.currentSong._id);
      const nextIndex = (currentIndex + 1) % state.songList.length;
  
      state.currentSong = state.songList[nextIndex];
      state.progress = 0;
      state.isPlaying = false; // Stop previous song first
    },
  
    playPrev: (state) => {
      if (!state.currentSong || state.songList.length === 0) return;
  
      const currentIndex = state.songList.findIndex(song => song._id === state.currentSong._id);
      const prevIndex = (currentIndex - 1 + state.songList.length) % state.songList.length;
  
      state.currentSong = state.songList[prevIndex];
      state.progress = 0;
      state.isPlaying = false; 
    },
    
    // Set the ad after it is fetched
    setAd: (state, action) => {
      state.currentAd = action.payload; // Set the fetched ad
      state.isAdPlaying = false; // Initially, the ad is not playing
    },

    // Action to start playing the ad
    playAd: (state) => {
      state.isAdPlaying = true; // Mark that the ad is playing
      state.isPlaying = false; // Pause the song
    },

    // Action to stop the ad and resume the song after the ad finishes or is skipped
    stopAd: (state) => {
      state.isAdPlaying = false; // Stop the ad
      state.isPlaying = true; // Resume the song
      state.currentAd = null; // Clear the ad
    },
  },
});


export const { setCurrentSong, playPause, updateProgress, stopPlayer, setSongList, playNext, playPrev, setAd, playAd, stopAd } = playerSlice.actions;
export default playerSlice.reducer;

//list all the freeuser
export function getAdsForFreeUsers(){
  return async function getAdsForFreeUsersThunk(dispatch) {
      dispatch(setStatus(STATUS.LOADING));
      try{
      const response=await APIAuthenticated.get("/api/ads/freeAds");
      if(response.status===200){
          const {data} =response.data;
          dispatch(setAd(data));
          dispatch(setStatus(STATUS.SUCCESS));
      }else{
          dispatch(setStatus(STATUS.ERROR)); 
      }
      }catch(err){
          console.log(err);
      dispatch(setStatus(STATUS.ERROR));  
      }  
  }
}
