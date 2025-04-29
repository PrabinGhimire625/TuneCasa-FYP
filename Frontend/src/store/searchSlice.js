import { createSlice } from "@reduxjs/toolkit";
import { APIAuthenticated } from "../http/index";
import { STATUS } from "../globals/components/enumStatus/Status";

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
            console.log("Data in setSearchData", action.payload);
            state.songs = action.payload.data.songs || [];  
           
            state.albums = action.payload.data.albums || [];  
            state.artists = action.payload.data.artists || [];  
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setSearchData, setStatus } = searchSlice.actions;
export default searchSlice.reducer;

// search the song, album and artist
export function searchSongAlbumArtist(query) {
    return async function search(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get(`/api/search?query=${query}`);
            console.log("response from the search", response);  
            if (response.status === 200) {
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
