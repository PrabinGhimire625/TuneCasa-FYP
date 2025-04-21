import { createSlice } from "@reduxjs/toolkit";
import { APIAuthenticated } from "../http";
import { STATUS } from "../globals/components/Status";

const initialState = {
    songs: [],
    albums: [],
    artists: [],
    status: STATUS.LOADING,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchData(state, action) {
            // Ensure to log the correct data structure you're dispatching.
            console.log("Data in setSearchData", action.payload);
            state.songs = action.payload.data.songs || [];  
            state.albums = action.payload.data.albums || [];  
            
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setSearchData, setStatus } = searchSlice.actions;
export default searchSlice.reducer;

// Thunk function to fetch search results
export function searchSongAlbumArtist(query) {
    return async function search(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get(`/api/search?query=${query}`);
            console.log("response from the search", response);  // Log the full response for debugging

            if (response.status === 200) {
                // Assuming response.data contains songs, albums, and artists directly
                dispatch(setSearchData(response.data));
                dispatch(setStatus(STATUS.SUCCESS));
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            console.error("Error fetching search results:", err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}
