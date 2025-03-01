import { createSlice } from "@reduxjs/toolkit";
import { API, APIAuthenticated } from "../http";
import { STATUS } from "../globals/components/Status";


const genreSlice = createSlice({
    name: "genre",
    initialState: {
        genre: [],
        singleGenre: null,
        status: STATUS.LOADING,
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

export const { setGenreData, setSingleGenre, setStatus, setDeleteGenre, setUpdateGenre } = genreSlice.actions;
export default genreSlice.reducer;

// Add Genre
export function addGenre(genreData) {
    return async function addGenreThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.post("/api/genre", genreData);
            if (response.status === 201) {  // Changed from 200 to 201 (Created)
                dispatch(setStatus(STATUS.SUCCESS));
                dispatch(listAllGenre());  // Refresh genre list
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
