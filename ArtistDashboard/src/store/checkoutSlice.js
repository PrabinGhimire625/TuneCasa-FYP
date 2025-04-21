import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/Status";
import { API, APIAuthenticated } from "../http";


const genreSlice = createSlice({
    name: "checkout",
    initialState: {
        checkoutHistory: [],
        singleCheckout: null,
        status: STATUS.LOADING,
    },
    reducers: {
        setArtistCheckoutHistory(state, action) {
            state.checkoutHistory = action.payload;
        },
        setSingleCheckout(state, action) {
            state.singleCheckout = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    },
});

export const { setArtistCheckoutHistory, setSingleCheckout, setStatus } = genreSlice.actions;
export default genreSlice.reducer;



// Checkout slice action (frontend)
export function requestCheckout(totalEarnings) {
    return async function requestCheckoutThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.post("/api/checkout", {
                totalEarnings, // Pass totalEarnings to the backend
            });

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


export function artistCheckoutHistory() {
    return async function artistCheckoutHistoryThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get("/api/checkout/artist/completed");
            if (response.status === 200) {
                // console.log("Response",response.data.data)
                dispatch(setArtistCheckoutHistory(response.data.data));
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

