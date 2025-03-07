import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/enumStatus/Status";
import { APIAuthenticated } from "../http";

const subscriptionSlice = createSlice({
    name: "subscription",
    initialState: {
        subscription: [],
        singleSubscription: null,
        status: STATUS.LOADING,
    },
    reducers: {
        setSubscriptionData(state, action) {
            state.subscription = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        }
    },
});

export const { setSubscriptionData, setStatus } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

// Add subscription
export function createSubscription(planName) {
    return async function createSubscriptionThunk(dispatch) {
      dispatch(setStatus(STATUS.LOADING));  // Set status to loading initially
      try {
        const response = await APIAuthenticated.post(`/api/subscription`, { planName });
        console.log("response is",response)
        if (response.status === 200) {
          dispatch(setStatus(STATUS.SUCCESS));  // Set status to success if request succeeds
          window.location.href = response.data.data.url;
        } else {
          dispatch(setStatus(STATUS.ERROR));  // Set status to error if request fails
        }
      } catch (err) {
        console.error("Subscription creation error:", err);
        dispatch(setStatus(STATUS.ERROR));  // Set status to error if there's a catch
      }
    };
  }

  // verify payment
export function paymentVerification(pidx) {
    return async function paymentVerificationThunk(dispatch) {
      dispatch(setStatus(STATUS.LOADING)); 
      try {
        const response = await APIAuthenticated.post(`/api/subscription/verify-payment`, { pidx });
        if (response.status === 200) {
          dispatch(setStatus(STATUS.SUCCESS));  
        } else {
          dispatch(setStatus(STATUS.ERROR));  
        }
      } catch (err) {
        dispatch(setStatus(STATUS.ERROR));  
      }
    };
  }
  
