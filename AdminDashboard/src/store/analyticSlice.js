import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/enumStatus/Status";
import { API, APIAuthenticated } from "../http";

const analyticSlice = createSlice({
    name: "analytics",
    initialState: {
        songDetails:[],
        singleSongAnalytics:null,
        artistSongAnalytics:[],
        totalUsers: null,
        totalArtists: null,
        totalSongs: null, 
        totalAlbums: null,
        totalPlaylist: null,
        totalSubscriptionUser: null,
        artistMonthlyEarning:null,
        status: STATUS.LOADING,
        checkout:null,
    },
    reducers: {
        setSongDetails(state, action) {
            state.songDetails = action.payload;
        },
        setSingleSongAnalytics(state, action) {
            state.singleSongAnalytics = action.payload;
        },
        setArtistSongAnalytics(state, action) {
            state.artistSongAnalytics = action.payload;
        },
        setTotalUsers(state, action) {
            state.totalUsers = action.payload;
        },
        setTotalArtists(state, action) {
            state.totalArtists = action.payload;
        },
        setTotalSongs(state, action) {
            state.totalSongs = action.payload;
        },
        setTotalAlbums(state, action) {
            state.totalAlbums = action.payload;
        },
        setTotalPlaylist(state, action) {
            state.totalPlaylist = action.payload;
        },
        setTotalSubscriptionUser(state, action) {
            state.totalSubscriptionUser = action.payload;
        },
        setArtistMonthlyEarning(state, action) {
            state.artistMonthlyEarning = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setCheckout(state, action) {
            state.checkout = action.payload;
        },
    }
});

export const { 
    setTotalUsers, 
    setTotalArtists, 
    setTotalSongs, 
    setTotalAlbums, 
    setTotalPlaylist, 
    setTotalSubscriptionUser, 
    setStatus, 
    setError, 
    setArtistSongAnalytics,
    setSongDetails,setSingleSongAnalytics,
    setArtistMonthlyEarning,setCheckout
} = analyticSlice.actions;
export default analyticSlice.reducer;

// Fetch Total Users
export const fetchTotalUsers = () => async (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    try {
        const response = await API.get("/api/user/total/count");
        if (response.status === 200) {
            dispatch(setTotalUsers(response.data.data));
            dispatch(setStatus(STATUS.SUCCESS));
        } else {
            throw new Error("Failed to fetch total users");
        }
    } catch (err) {
        console.error("Error fetching total users:", err);
        dispatch(setError(err.message));
        dispatch(setStatus(STATUS.ERROR));
    }
};

// Fetch Total Artists
export const fetchTotalArtists = () => async (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    try {
        const response = await API.get("/api/artist/total/count"); 
        if (response.status === 200) {
            dispatch(setTotalArtists(response.data.data));
            dispatch(setStatus(STATUS.SUCCESS));
        } else {
            throw new Error("Failed to fetch total artists");
        }
    } catch (err) {
        console.error("Error fetching total artists:", err);
        dispatch(setError(err.message));
        dispatch(setStatus(STATUS.ERROR));
    }
};

// Fetch Total Songs
export const fetchTotalSongs = () => async (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    try {
        const response = await API.get("/api/song/total/count"); 
        if (response.status === 200) {
            dispatch(setTotalSongs(response.data.data));
            dispatch(setStatus(STATUS.SUCCESS));
        } else {
            throw new Error("Failed to fetch total songs");
        }
    } catch (err) {
        console.error("Error fetching total songs:", err);
        dispatch(setError(err.message));
        dispatch(setStatus(STATUS.ERROR));
    }
};

// Fetch Total Albums
export const fetchTotalAlbums = () => async (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    try {
        const response = await API.get("/api/album/total/count");
        if (response.status === 200) {
            dispatch(setTotalAlbums(response.data.data));
            dispatch(setStatus(STATUS.SUCCESS));
        } else {
            throw new Error("Failed to fetch total albums");
        }
    } catch (err) {
        console.error("Error fetching total albums:", err);
        dispatch(setError(err.message));
        dispatch(setStatus(STATUS.ERROR));
    }
};

// Fetch Total Playlists
export const fetchTotalPlaylists = () => async (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    try {
        const response = await API.get("/api/playlist/total/count"); 
        if (response.status === 200) {
            dispatch(setTotalPlaylist(response.data.data));
            dispatch(setStatus(STATUS.SUCCESS));
        } else {
            throw new Error("Failed to fetch total playlists");
        }
    } catch (err) {
        console.error("Error fetching total playlists:", err);
        dispatch(setError(err.message));
        dispatch(setStatus(STATUS.ERROR));
    }
};

// Fetch Total Subscription Users
export const fetchTotalSubscriptionUsers = () => async (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    try {
        const response = await API.get("/api/subscription/total/count"); 
        if (response.status === 200) {
            dispatch(setTotalSubscriptionUser(response.data.data));
            dispatch(setStatus(STATUS.SUCCESS));
        } else {
            throw new Error("Failed to fetch total subscription users");
        }
    } catch (err) {
        console.error("Error fetching total subscription users:", err);
        dispatch(setError(err.message));
        dispatch(setStatus(STATUS.ERROR));
    }
};


// Fetch Total Subscription Users
export const fetchSongDetails = () => async (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    try {
        const response = await APIAuthenticated.get("/api/song-analytics/totalAnalyticsPerSong"); 
        if (response.status === 200) {
            dispatch(setSongDetails(response.data.data));
            dispatch(setStatus(STATUS.SUCCESS));
        } else {
            throw new Error("Failed to fetch song details");
        }
    } catch (err) {
        console.error("Error fetching song details", err);
        dispatch(setError(err.message));
        dispatch(setStatus(STATUS.ERROR));
    }
};


//list the single song analytics
export function fetchSingleSongAnalytics(id){
    return async function fetchSingleSongAnalyticsThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await API.get(`/api/song-analytics/totalAnalyticsPerSong/${id}`);
        if(response.status===200){
            const {data} =response.data;
            dispatch(setSingleSongAnalytics(data));
            dispatch(setStatus(STATUS.SUCCESS));
        }
        else{
            dispatch(setStatus(STATUS.ERROR));  
        }
        }catch(err){
        dispatch(setStatus(STATUS.ERROR));  
        }  
    }
}


//list the artists song analytics
export function fetchArtistSongAnalytics(id){
    return async function fetchArtistSongAnalyticsThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await APIAuthenticated.get(`/api/song-analytics/artistSong/${id}`);
        if(response.status===200){
            const {data} =response.data;
            dispatch(setArtistSongAnalytics(data));
            dispatch(setStatus(STATUS.SUCCESS));
        }
        else{
            dispatch(setStatus(STATUS.ERROR));  
        }
        }catch(err){
        dispatch(setStatus(STATUS.ERROR));  
        }  
    }
}

//calculate the artist monthly based earning from song
export function calculateArtistMonthlyEarning(id){
    return async function calculateArtistMonthlyEarningThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await API.get(`/api/song-analytics/artist/monthly-earnings/${id}`);
        if(response.status===200){
            const {data} =response.data;
            dispatch(setArtistMonthlyEarning(data));
            dispatch(setStatus(STATUS.SUCCESS));
        }
        else{
            dispatch(setStatus(STATUS.ERROR));  
        }
        }catch(err){
        dispatch(setStatus(STATUS.ERROR));  
        }  
    }
}


// checkout 
export function artistCheckout() {
    return async function artistCheckoutThunk(dispatch) {
      dispatch(setStatus(STATUS.LOADING));
      try {
        const response = await APIAuthenticated.post(`/api/song-analytics/checkout`);
    
        if (response.status === 200) {
          dispatch(setStatus(STATUS.SUCCESS));
        } else {
          dispatch(setStatus(STATUS.ERROR));
        }
      } catch (err) {
        console.error("Checkout error:", err);
        dispatch(setStatus(STATUS.ERROR));
      }
    };
  }
  
  