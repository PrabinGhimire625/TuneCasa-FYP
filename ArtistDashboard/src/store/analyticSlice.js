import { createSlice } from "@reduxjs/toolkit";
import { API, APIAuthenticated } from "../http";
import { STATUS } from "../globals/components/Status";


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
        artistTrendingSong:[],
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
        setArtistTrendingSong(state, action) {
            state.artistTrendingSong = action.payload;
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
    setArtistTrendingSong,
    setArtistSongAnalytics,
    setSongDetails,setSingleSongAnalytics,
    setArtistMonthlyEarning
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
        const response = await API.get("/api/song-analytics/totalAnalyticsPerSong"); 
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


//list the single song analytics
export function fetchArtistSongAnalytics(){
    return async function fetchArtistSongAnalyticsThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await APIAuthenticated.get(`/api/song-analytics/artistSong/`);
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
export function calculateArtistMonthlyEarning(){
    return async function calculateArtistMonthlyEarningThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await APIAuthenticated.get(`/api/song-analytics/artist/monthly-earnings`);
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


// //list the artisrt trending 5
export function fetchArtistTrendingSong(id){
    return async function fetchArtistTrendingSong(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await APIAuthenticated.get(`/api/song-analytics/trendingSong`);
        if(response.status===200){
            const {data} =response.data;
            dispatch(setArtistTrendingSong(data));
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