// playerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null,
  isPlaying: false,
  progress: 0,
  songList: [], // Store the list of songs
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
      const nextIndex = (currentIndex + 1) % state.songList.length; // Loop back to the first song
      state.currentSong = state.songList[nextIndex];
      state.progress = 0;  // Reset progress
      state.isPlaying = true; // Ensure it starts playing
  },
  playPrev: (state) => {
    if (!state.currentSong || state.songList.length === 0) return;

    const currentIndex = state.songList.findIndex(song => song._id === state.currentSong._id);
    const prevIndex = (currentIndex - 1 + state.songList.length) % state.songList.length; // Loop to the last song if it's the first song
    state.currentSong = state.songList[prevIndex];
    state.progress = 0;  // Reset progress
    state.isPlaying = true; // Ensure it starts playing
}

  
   
  },
});

export const { setCurrentSong, playPause, updateProgress, stopPlayer, setSongList, playNext, playPrev } = playerSlice.actions;
export default playerSlice.reducer;
