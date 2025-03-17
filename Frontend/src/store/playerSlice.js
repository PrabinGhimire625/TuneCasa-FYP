import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/enumStatus/Status";
import { setStatus } from "./adsSlice";
import { APIAuthenticated } from "../http";

const initialState = {
  currentSong: null,
  isPlaying: false,
  progress: 0,
  songList: [],
  currentAd: null,
  isAdPlaying: false,
  adList: [],
  songCounter: 0, // Track number of songs before showing an ad
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.progress = 0;
    },
    playPause: (state, action) => {
      state.isPlaying = action.payload !== undefined ? action.payload : !state.isPlaying;
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
    playNextSong: (state) => {
      if (!state.currentSong || state.songList.length === 0 || state.isAdPlaying) return;

      const currentIndex = state.songList.findIndex(song => song._id === state.currentSong._id);
      const nextIndex = (currentIndex + 1) % state.songList.length;

      state.currentSong = state.songList[nextIndex];
      state.progress = 0;
      state.isPlaying = true;
      state.songCounter += 1;
    },
    playPrev: (state) => {
      if (!state.currentSong || state.songList.length === 0) return;
      const currentIndex = state.songList.findIndex(song => song._id === state.currentSong._id);
      const prevIndex = (currentIndex - 1 + state.songList.length) % state.songList.length;
      state.currentSong = state.songList[prevIndex];
      state.progress = 0;
      state.isPlaying = true;
    },
    setAd: (state, action) => {
      state.currentAd = action.payload;
    },
    playAd: (state) => {
      state.isAdPlaying = true;
      state.isPlaying = false;
    },
    stopAd: (state) => {
      state.isAdPlaying = false;
      state.isPlaying = true;
      state.currentAd = null;
    },
    resetSongCounter: (state) => {
      state.songCounter = 0;
    },
  },
});

export const { 
  setCurrentSong, playPause, updateProgress, stopPlayer, setSongList, 
  playNextSong, playPrev, setAd, playAd, stopAd, resetSongCounter 
} = playerSlice.actions;

export default playerSlice.reducer;

// 🔹 Thunk to Handle Next with Ad Logic
export function handlePlayNext() {
  return async function (dispatch, getState) {
    const { songCounter } = getState().player;

    if (songCounter >= 2) {  
      dispatch(resetSongCounter());
      dispatch(getAdsForFreeUsers());
    } else {
      dispatch(playNextSong());
    }
  };
}

// 🔹 Thunk to Fetch Ads
export function getAdsForFreeUsers() {
  return async function (dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await APIAuthenticated.get("/api/ads/freeAds");
      if (response.status === 200) {
        const { data } = response.data;
        if (data) {
          dispatch(setAd(data));
          dispatch(playAd());
        }
        dispatch(setStatus(STATUS.SUCCESS));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      console.error(err);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}
