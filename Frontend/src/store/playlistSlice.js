import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/enumStatus/Status";
import { API, APIAuthenticated } from "../http";


const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlist: [],
    status: STATUS.LOADING,
    singleplaylist:null
  },
  reducers: {
    setPlaylistData(state, action) {
      state.playlist = action.payload; 
    },
    setStatus(state, action) {
      state.status = action.payload; 
    },
    setSinglePlaylist(state, action){
      state.singleplaylist=action.payload;
    },
    setUpdateplaylist(state, action) {
      const index = state.playlist.findIndex(item => item._id === action.payload.id); // Ensure you're matching by `_id`
      if (index !== -1) {
        state.playlist[index] = {
          ...state.playlist[index], 
          ...action.payload.playlistData, // Use the correct payload structure
        };
      }
    }
    
    

  },
});

export const { setPlaylistData, setStatus, setSinglePlaylist, setUpdateplaylist } = playlistSlice.actions;
export default playlistSlice.reducer;


//create playlist
export function createPlaylist(playlistData) {
  return async function createPlaylistThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING)); 
    try {
      const response = await APIAuthenticated.post("/api/playlist", playlistData);

      if (response.status === 200) {
        dispatch(setStatus(STATUS.SUCCESS));
      } else {
        dispatch(setStatus(STATUS.ERROR)); 
      }
    } catch (err) {
      dispatch(setStatus(STATUS.ERROR)); 
    }
  };
}


// Add song to playlist
export function AddSongOnPlaylist(songId, playlistId) {
  return async function AddSongOnPlaylistThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      // Make an API call to add the song to the playlist
      const response = await APIAuthenticated.post(`/api/playlist/add-song/${playlistId}`, { songId });

      console.log(response);

      if (response.status === 200) {
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



//list all the playlists
export function listAllPlaylist(){
    return async function listAllPlaylistThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await API.get("/api/playlist");
        if(response.status===200){
            const {data} =response.data;
            dispatch(setPlaylistData(data));
            dispatch(setStatus(STATUS.SUCCESS));
        }else{
            dispatch(setStatus(STATUS.ERROR)); 
        }
        }catch(err){
            console.log(err)
        dispatch(setStatus(STATUS.ERROR));  
        }  
    }
}

//fetch single playlist
export function fetchSinglePlaylist(id){
  return async function fetchSinglePlaylist(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try{
      const response= await APIAuthenticated.get(`/api/playlist/${id}`);
      if(response.status===200){
        const {data}=response.data;
        dispatch(setSinglePlaylist(data));
        dispatch(setStatus(STATUS.SUCCESS));
      }
    }catch(err){
      dispatch(setStatus(STATUS.ERROR));
    }
  }
}

// update playlist
export function updatePlaylist({ id, playlistData }) {
  return async function updatePlaylistThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await APIAuthenticated.patch(`/api/playlist/${id}`, playlistData);
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setUpdateplaylist({ id, playlistData: data })); // Fixed function name
        dispatch(setStatus(STATUS.SUCCESS));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}




