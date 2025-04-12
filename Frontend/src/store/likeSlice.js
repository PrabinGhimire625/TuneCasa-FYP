import { createSlice } from "@reduxjs/toolkit";
import { API, APIAuthenticated } from "../http/index";
import { STATUS } from "../globals/components/enumStatus/Status";


const likeSlice = createSlice({
    name: "like",
    initialState: {
        like: [],
        singlelike: null,
        status: STATUS.LOADING,
    },
    reducers: {
        setlikeData(state, action) {
            state.like = action.payload;
        },
        setSinglelike(state, action) {
            state.singlelike = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    },
});

export const { setlikeData, setSinglelike, setStatus } = likeSlice.actions;
export default likeSlice.reducer;

// Add like
export function addLike({songId} ) {
    return async function addLikeThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.post(`/api/like/${songId}`);
            if (response.status === 200) {  
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


export function listAllLikeSong() {
    return async function listAllLikeSongThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get("/api/like");
            if (response.status === 200) {
                dispatch(setlikeData(response.data.data));
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
