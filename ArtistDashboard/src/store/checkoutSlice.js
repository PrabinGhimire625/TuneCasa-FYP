import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/Status";
import { API, APIAuthenticated } from "../http";


const genreSlice = createSlice({
    name: "checkout",
    initialState: {
        checkoutData: [],
        singleCheckout: null,
        status: STATUS.LOADING,
    },
    reducers: {
        setCheckoutData(state, action) {
            state.checkoutData = action.payload;
        },
        setSingleCheckout(state, action) {
            state.singleCheckout = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    },
});

export const { setCheckoutData, setSingleCheckout, setStatus } = genreSlice.actions;
export default genreSlice.reducer;



// List All Genres
export function artistCheckoutHistory() {
    return async function artistCheckoutHistoryThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get("/api/checkout");
            if (response.status === 200) {
                // console.log("Response",response.data.data)
                dispatch(setCheckoutData(response.data.data));
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
export function singleArtistCheckoutHistory(id) {
    return async function singleArtistCheckoutHistoryThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get(`/api/checkout/${id}`);
            if (response.status === 200) {
                dispatch(setSingleCheckout(response.data.data));
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