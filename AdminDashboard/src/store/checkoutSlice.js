import { createSlice } from "@reduxjs/toolkit";
import { API } from "../http";
import { STATUS } from "../globals/enumStatus/Status";



const genreSlice = createSlice({
    name: "checkout",
    initialState: {
        checkoutData: [],
        singleCheckout: null,
        checkoutHistory:[],
        status: STATUS.LOADING,
    },
    reducers: {
        setCheckoutData(state, action) {
            state.checkoutData = action.payload;
        },
        setSingleCheckout(state, action) {
            state.singleCheckout = action.payload;
        },
        setCheckoutHistory(state, action) {
            state.checkoutHistory = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    },
});

export const { setCheckoutData, setSingleCheckout, setStatus,setCheckoutHistory } = genreSlice.actions;
export default genreSlice.reducer;



//fetch all requested checkout
export function fetchAllRequestCheckout() {
    return async function fetchAllRequestCheckoutThunk(dispatch) {
      dispatch(setStatus(STATUS.LOADING));
      try {
        const response = await API.get("/api/checkout/requested");
        console.log("Response", response);
  
        if (response.status === 200) {
          dispatch(setCheckoutData(response.data.data)); // ✅ Fixed here
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
  

// make the reques completed
export function fetchSingleCheckout(checkoutId) {
  return async function fetchSingleCheckoutThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await API.get(`/api/checkout/${checkoutId}`);
      console.log("Response", response);

      if (response.status === 200) {
        dispatch(setSingleCheckout(response.data.data))
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


// make the reques completed
export function completeCheckout(id) {
  return async function completeCheckoutThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await API.patch(`/api/checkout/completed/${id}`);
      console.log("Response", response);

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


// get all checkout completed history
export function getAllCheckoutCompletedHistory() {
  return async function getAllCheckoutCompletedHistoryThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await API.get(`/api/checkout/completed`);
      console.log("Response", response);

      if (response.status === 200) {
        dispatch(setCheckoutHistory(response.data.data));
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
