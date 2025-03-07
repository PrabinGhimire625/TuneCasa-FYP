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

// verify subscription
export function verifyActiveSubscription() {
  return async function verifyActiveSubscriptionThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING)); // Set the status to loading while checking

    try {
      const response = await APIAuthenticated.get(`/api/subscription/check-active-subscription`);
      console.log("Backend response:", response); // Log the full response object

      if (response.status === 200) {
        const { data } = response.data; // Correctly access response.data
        dispatch(setSubscriptionData(data));
        console.log("data in the store", data)
        dispatch(setStatus(STATUS.SUCCESS));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      console.error("Error verifying subscription:", err);
      dispatch(setStatus(STATUS.ERROR)); 
    }
  };
}

