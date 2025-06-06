import { createSlice } from "@reduxjs/toolkit";
import { API, APIAuthenticated } from "../http";
import { STATUS } from "../globals/components/enumStatus/Status";


const genreSlice = createSlice({
    name: "genre",
    initialState: {
        genre: [],
        singleGenre: null,
        status: STATUS.LOADING,
        albumByGenre:null,
        songByGenre:null
    },
    reducers: {
        setGenreData(state, action) {
            state.genre = action.payload;
        },
        setSingleGenre(state, action) {
            state.singleGenre = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setAlbumByGenre(state,action){
            state.albumByGenre=action.payload
        },
        setSongByGenre(state,action){
            state.songByGenre=action.payload
        },
        setUpdateGenre(state, action) {
            const index = state.genre.findIndex(item => item._id === action.payload.id);
            if (index !== -1) {
                state.genre[index] = {
                    ...state.genre[index],
                    ...action.payload.data,
                };
            }
        },
        setDeleteGenre(state, action) {
            state.genre = state.genre.filter(item => item._id !== action.payload.genreId);
        },
    },
});

export const { setGenreData, setSingleGenre, setStatus, setDeleteGenre, setUpdateGenre ,setAlbumByGenre, setSongByGenre} = genreSlice.actions;
export default genreSlice.reducer;

// Add Genre
export function addGenre(genreData) {
    return async function addGenreThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.post("/api/genre", genreData);
            if (response.status === 201) {  
                dispatch(setStatus(STATUS.SUCCESS));
                dispatch(listAllGenre());  
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            console.error(err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

// List All Genres
export function listAllGenre() {
    return async function listAllGenreThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await API.get("/api/genre");
            if (response.status === 200) {
                dispatch(setGenreData(response.data.data));
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

// Get Single Genre
export function listSingleGenre(genreId) {
    return async function listSingleGenreThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get(`/api/genre/${genreId}`);
            if (response.status === 200) {
                dispatch(setSingleGenre(response.data.data));
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

// Delete Genre
export function deleteGenre(genreId) {
    return async function deleteGenreThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.delete(`/api/genre/${genreId}`);
            if (response.status === 200) {
                dispatch(setDeleteGenre({ genreId }));
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

// Update Genre
export function updateGenre({ id, genreData }) {
    return async function updateGenreThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.patch(`/api/genre/${id}`, genreData);
            if (response.status === 200) {
                dispatch(setUpdateGenre({ id, data: response.data.data }));
                dispatch(setStatus(STATUS.SUCCESS));
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}


//fetch album by genre
export function fetchAlbumByGenre(genre) {  
    return async function fetchAlbumByGenreThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await API.get(`/api/album/albumByGenre/genres/${genre}`); 
            if (response.status === 200) {
                const { data } = response.data;
                dispatch(setAlbumByGenre(data));
                dispatch(setStatus(STATUS.SUCCESS));
            }
        } catch (err) {
            dispatch(setStatus(STATUS.ERROR));  
        }   
    }
}

//fetch song by genre
export function fetchSongByGenre(genre) {  
    return async function fetchSongByGenreThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await API.get(`/api/song/songByGenre/genres/${genre}`); 
            if (response.status === 200) {
                const { data } = response.data;
                dispatch(setSongByGenre(data));
                dispatch(setStatus(STATUS.SUCCESS));
            }
        } catch (err) {
            dispatch(setStatus(STATUS.ERROR));  
        }   
    }
}