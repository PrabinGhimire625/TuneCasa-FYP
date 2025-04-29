import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/enumStatus/Status";
import {API, APIAuthenticated} from "../http/index"

const albumSlice = createSlice({
    name: "album",
    initialState: {
        albums: [], 
        singleAlbum: null, 
        status: STATUS.LOADING,
        latestAlbum:[],
    },
    reducers: {
        setAlbumData(state, action) {
            state.albums = action.payload;
        },
        setSingleAlbum(state, action) {
            state.singleAlbum = action.payload; 
        },
        setLatestAlbumData(state, action) {
            state.latestAlbum = action.payload;
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
            const index = state.albums.findIndex(album => album._id === action.payload.albumId);  
            if (index !== -1) {
                state.albums.splice(index, 1); 
            }
        }
        
    },
});

export const { setAlbumData, setSingleAlbum, setStatus,setDeleteAlbum,setUpdateAlbum,setLatestAlbumData } = albumSlice.actions;
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



//List all latest album
export function listLatestAlbum() {
    return async function listLatestAlbumThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await API.get("/api/album/latestReleaseAlbum");
            if (response.status === 200) {
                const { data } = response.data;
                dispatch(setLatestAlbumData(data));
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
            const response = await APIAuthenticated.get(`/api/album/${albumId}`);
            console.log(response)
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

//Fetch a single album
export function listSingleAlbumByName(name) {
    return async function listSingleAlbumThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get(`/api/album/${name}`);
            console.log(response)
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
