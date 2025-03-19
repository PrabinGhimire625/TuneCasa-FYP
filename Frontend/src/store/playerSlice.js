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
  adWatchTime: 0, // Track current ad watch time
  totalAdWatchTime: 0, // Accumulate total watch time of ads
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
      console.log("Updating Redux Progress:", action.payload);
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
      state.adWatchTime = 0; // Reset ad watch time on new ad
    },
    playAd: (state) => {
      state.isAdPlaying = true;
      state.isPlaying = false;
    },
    stopAd: (state) => {
      state.isAdPlaying = false;
      state.isPlaying = true;
      state.currentAd = null;
      state.adWatchTime = 0; // Reset when ad stops
    },
    resetSongCounter: (state) => {
      state.songCounter = 0;
    },
    setTrackAdWatchTime(state, action) {
      state.adWatchTime = action.payload;
      state.totalAdWatchTime += action.payload; // Accumulate total ad watch time
  },
  },
});

export const { 
  setCurrentSong, playPause, updateProgress, stopPlayer, setSongList, 
  playNextSong, playPrev, setAd, playAd, stopAd, resetSongCounter, setTrackAdWatchTime 
} = playerSlice.actions;

export default playerSlice.reducer;

// 🔹 Thunk to Handle Next with Ad Logic
export function handlePlayNext() {
  return async function (dispatch, getState) {
    const { songCounter, isAdPlaying } = getState().player;

    if (songCounter >= 2) {
      dispatch(resetSongCounter());
      dispatch(getAdsForFreeUsers());
    } else {
      if (!isAdPlaying) {
        dispatch(playNextSong());
      } else {
        dispatch(stopAd());
        dispatch(playNextSong());
      }
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

//track ads view
// Track ad watch time and update redux store
export function trackAdWatchTime({ id, watchTime }) {
  return async function trackAdWatchTimeThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await APIAuthenticated.post("/api/ads/track-watchTime", {
        id,
        watchTime,
      });

      if (response.status === 200) {
        dispatch(setTrackAdWatchTime(response.data)); // Update Redux store
        dispatch(setStatus(STATUS.SUCCESS));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}
