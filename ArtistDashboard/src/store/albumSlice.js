import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/Status";
import {API, APIAuthenticated} from "../http/index"

const albumSlice = createSlice({
    name: "album",
    initialState: {
        albums: [], 
        singleAlbum: null, 
        status: STATUS.LOADING,
        albumOfArtist:[],
    },
    reducers: {
        setAlbumData(state, action) {
            state.albums = action.payload;
        },
        setSingleAlbum(state, action) {
            state.singleAlbum = action.payload; 
        },
        setAlbumOfArtist(state, action) {
            state.albumOfArtist = action.payload; 
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setUpdateAlbum(state, action){
            const index=state.albums.findIndex(item=>item.id===action.payload.id);
            if(index!==-1){
                state.albums[index]={
                    ...state.albums[index],
                    ...action.payload.album
                }
            }
        }
        ,
        setDeleteAlbum(state, action) {
            const { albumId } = action.payload;
        
            // Remove album from the global album list
            const index = state.albums.findIndex(album => album._id === albumId);  
            if (index !== -1) {
                state.albums.splice(index, 1); // Remove the album from the list
            }
        
            // Also remove the album from the artist-specific album list
            const artistIndex = state.albumOfArtist.findIndex(album => album._id === albumId);  
            if (artistIndex !== -1) {
                state.albumOfArtist.splice(artistIndex, 1); // Remove from the artist's list
            }
        }
        
        
    },
});

export const { setAlbumData, setSingleAlbum, setStatus,setDeleteAlbum,setUpdateAlbum, setAlbumOfArtist } = albumSlice.actions;
export default albumSlice.reducer;

// Add a new album
export function addAlbum(albumData) {
    return async function addAlbumThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.post("/api/album", albumData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("The response from add album is", response);

            if (response.status === 200) {
                dispatch(setStatus(STATUS.SUCCESS));
                dispatch(listAllAlbum());  // Fetch all the album after add album
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            console.error(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}


//List all albums
export function listAllAlbum() {
    return async function listAllAlbumThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get("/api/album");
            if (response.status === 200) {
                const { data } = response.data;
                dispatch(setAlbumData(data));
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

//List all albums of the specific artist
export function listAllAlbumOfArtist() {
    return async function listAllAlbumOfArtist(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get("/api/album/albumOfArtist");
            if (response.status === 200) {
                const { data } = response.data;
                dispatch(setAlbumOfArtist(data));
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

//Fetch a single album
export function listSingleAlbum(albumId) {
    return async function listSingleAlbumThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await API.get(`/api/album/singleAlbum/${albumId}`);
            console.log(" from backend", response)
            if (response.status === 200) {
                const { data } = response.data;
                console.log(data)
                dispatch(setSingleAlbum(data));
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

//delete album
export function deleteAlbum(albumId) {
    return async function deleteAlbumThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.delete(`/api/album/${albumId}`);
            if (response.status === 200) {
                dispatch(setDeleteAlbum({albumId}));
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


//update album
export function updateAlbum({ id, albumData }) {
    return async function updateAlbumThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));  

        try {
            const response = await APIAuthenticated.patch(`/api/album/${id}`, albumData, {
                headers: {
                    "Content-Type": "multipart/form-data", 
                },
            });
            if (response.status === 200) {
                const { data } = response.data;
                dispatch(setUpdateAlbum({ id, data })); 
                dispatch(setStatus(STATUS.SUCCESS));
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
