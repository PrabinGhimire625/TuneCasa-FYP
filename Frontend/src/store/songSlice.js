import { createSlice } from "@reduxjs/toolkit";
import {STATUS} from "../globals/components/enumStatus/Status"
import {API, APIAuthenticated} from "../http/index"
const songSlice=createSlice({
    name:"song",
    initialState:{
        song:[],
        status:STATUS.LOADING,
        singleSong:null,
        songByAlbum:null,
        artistSong:null,
    },
    reducers:{
        setSong(state,action){
            state.song=action.payload
        },
        setStatus(state,action){
            state.status=action.payload
        },
        setSingleSong(state,action){
            state.singleSong=action.payload
        },
        setSongByAlbum(state,action){
            state.songByAlbum=action.payload
        },
        setSongOfArtist(state,action){
            state.artistSong=action.payload
        },
        setDeleteSong(state, action) {
            const index = state.song.findIndex(songs => songs._id === action.payload.songId); 
            if (index !== -1) {
                state.song.splice(index, 1); 
            }
        },
        setUpdateSong(state, action) {
            const index = state.song.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.song[index] = {
                    ...state.song[index], 
                    ...action.payload.songData 
                };
            }
        }
        
    }
})

export const {setSong,setStatus,setSingleSong,setDeleteSong,setUpdateSong, setSongByAlbum,setSongOfArtist}=songSlice.actions
export default songSlice.reducer


//add song
export function addSong(songData){
    return async function addSongThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
            const response= await APIAuthenticated.post("/api/song", songData,{
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            })
            if(response.status===200){
                dispatch(setStatus(STATUS.SUCCESS));
            }else{
                dispatch(setStatus(STATUS.ERROR));
            }
        }catch(err){
            dispatch(setStatus(STATUS.ERROR));
        } 
    }
}


//list all the songs
export function listAllSong(){
    return async function listAllSongThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await API.get("/api/song");
        if(response.status===200){
            const {data} =response.data;
            dispatch(setSong(data));
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

//fetch song by album
export function fetchAllSongByAlbum(album) {  // Accept album as a parameter
    return async function fetchAllSongByAlbumThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await API.get(`api/song/${album}`);  // Use album parameter in API request
            console.log("response from the fetch all song by album ", response);
            
            if (response.status === 200) {
                const { data } = response.data;
                dispatch(setSongByAlbum(data));  // Dispatch the fetched data
                dispatch(setStatus(STATUS.SUCCESS));
            }
        } catch (err) {
            dispatch(setStatus(STATUS.ERROR));  
        }   
    }
}



//list the single song
export function listSingleSong(id){
    return async function listSingleSongThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await APIAuthenticated.get(`/api/song/singleSong/${id}`);
        if(response.status===200){
            const {data} =response.data;
            dispatch(setSingleSong(data));
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

//delete the song
export function deleteSong(songId){
    return async function deleteSongThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
        const response=await APIAuthenticated.delete(`/api/song/${songId}`);
        console.log(response);
        if(response.status===200){
            dispatch(setDeleteSong({songId}));
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

export function updateSong({id, songData}){
    return async function updateSongThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        const response= await APIAuthenticated.patch(`/api/song/${id}`, songData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
        if(response.status===200){
            const { data } = response.data;
            dispatch(setUpdateSong({ id, data })); 
            dispatch(setStatus(STATUS.SUCCESS));
        }else{
            dispatch(setStatus(STATUS.ERROR));
        }
    } 
}

export function getArtistSong(id){
    return async function getArtistSongThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try{
            const response=await APIAuthenticated.get(`/api/song/artist/${id}`);
            if(response.status===200){
                const {data}=response.data;
                dispatch(setSongOfArtist(data));
                dispatch(setStatus(STATUS.SUCCESS));
            }
        }catch(err){
            dispatch(setStatus(STATUS.ERROR));
        }
    }
}

