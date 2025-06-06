import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/enumStatus/Status";
import { setStatus } from "./adsSlice";
import { API, APIAuthenticated } from "../http";

const initialState = {
  currentSong: null,
  isPlaying: false,
  progress: 0,
  songList: [],
  currentAd: null,
  isAdPlaying: false,
  adList: [],
  songCounter: 0, 
  adWatchTime: 0, 
  totalAdWatchTime: 0, 
  songAnalytics:null,
  adsAnalytics:null
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
      state.adWatchTime = 0; 
    },
    playAd: (state) => {
      state.isAdPlaying = true;
      state.isPlaying = false;
    },
    stopAd: (state) => {
      state.isAdPlaying = false;
      state.isPlaying = true;
      state.currentAd = null;
      state.adWatchTime = 0;
    },
    resetSongCounter: (state) => {
      state.songCounter = 0;
    },
    setTrackAdWatchTime(state, action) {
      state.adWatchTime = action.payload;
      state.totalAdWatchTime += action.payload;
    },
    setTrackAdsSkips(state, action) {
      state.currentAd = {
        ...state.currentAd,
        totalSkips: action.payload.totalSkips
      };
    },
    setTrackAdsClick(state, action) {
      state.currentAd = {
        ...state.currentAd,
        totalClicks: action.payload.totalClicks
      };
    },
    setSongAnalytics(state, action) {
      state.songAnalytics = action.payload;
    },
    setAdsAnalytics(state, action) {
      state.adsAnalytics = action.payload;
    },
  }
});

export const { 
  setCurrentSong, playPause, updateProgress, stopPlayer, setSongList, 
  playNextSong, playPrev, setAd, playAd, stopAd, resetSongCounter, 
  setTrackAdWatchTime, setTrackAdsSkips, setTrackAdsClick,setSongAnalytics, setAdsAnalytics
} = playerSlice.actions;

export default playerSlice.reducer;

//handele play and next
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

// Fetch Ads for the free user
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

// Track ad watch time
export function trackAdWatchTime({ id, watchTime }) {
  return async function trackAdWatchTimeThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await APIAuthenticated.post("/api/ads/track-watchTime", {
        id,
        watchTime,
      });

      if (response.status === 200) {
        dispatch(setTrackAdWatchTime(response.data)); 
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


//track ads skips
export function trackAdSkip(id) {
  return async function trackAdSkipThunk(dispatch) {
      dispatch(setStatus(STATUS.LOADING));
      try {
          const response = await APIAuthenticated.post("/api/ads/track-skip", { id });

          if (response.status === 200) {
              dispatch(setTrackAdsSkips(response.data));
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


//track ad click
export function trackAdClick(id) {
  return async function trackAdClickThunk(dispatch) {
      dispatch(setStatus(STATUS.LOADING));
      try {
          const response = await APIAuthenticated.post("/api/ads/track-click", { id });

          if (response.status === 200) {
              dispatch(setTrackAdsClick(response.data));
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


//track the trackSongAnalytics
export function trackSongAnalytic({songId, watchTime }) {
  return async function trackSongAnalyticThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING)); 
    try {
      const response = await APIAuthenticated.post('/api/song-analytics', {
        songId,
        watchTime,
      });
      console.log("response on the song analytics", response)

      if (response.status === 200) {
        dispatch(setSongAnalytics(response.data));  
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

// track song views
export function trackSongView({songId }) {
  return async function trackSongViewThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));  

    try {
      const response = await APIAuthenticated.post('/api/song-analytics/view', {
        songId,
      });
      if (response.status === 200) {
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

//track the trackAdsAnalytics
export function trackAdsAnalytic({adId, watchTime }) {
  return async function trackSongAnalyticThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));  

    try {
      const response = await API.post('/api/ads-tracking', {
        adId,
        watchTime,
      });
      console.log("response on the song analytics", response)

      if (response.status === 200) {
        dispatch(setAdsAnalytics(response.data));  
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

//track adview
export function trackAdView({ adId }) {
  return async function trackAdViewThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));  
    try {
      const response = await API.post("/api/ads-tracking/view", { adId });

      if (response.status === 200) {
        dispatch(setStatus(STATUS.SUCCESS));
        console.log("Ad view tracked successfully.");
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      console.error("Error tracking ad view:", err);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}