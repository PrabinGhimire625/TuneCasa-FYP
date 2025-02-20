import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSong: null, // Store the selected song
  isPlaying: false,  // Track play/pause state
  progress: 0,       // Store the current time of the song
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;  // Start playing when a song is selected
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
  },
});

export const { setCurrentSong, playPause, updateProgress, stopPlayer } = playerSlice.actions;
export default playerSlice.reducer;
