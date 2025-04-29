import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/enumStatus/Status";
import { API, APIAuthenticated } from "../http";
import { deleteSubscription } from "../../../Backend/controllers/subscriptionController";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    subscription: [],
    singleSubscription: null,
    status: STATUS.LOADING,
    paymentHistory:[],
  },
  reducers: {
    setSubscriptionData(state, action) {
      state.subscription = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setPaymentHistory(state, action) {
      state.paymentHistory = action.payload;
    },
    setDeleteSubscription(state, action) {
      const index = state.subscription.findIndex(
        sub => sub._id === action.payload.subscriptionId
      );
      if (index !== -1) {
        state.subscription.splice(index, 1);
      }
    }
  },
});

export const { setSubscriptionData, setStatus, setDeleteSubscription, setPaymentHistory } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

// Add subscription
export function createSubscription(planName) {
  return async function createSubscriptionThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING)); 
    try {
      const response = await APIAuthenticated.post(`/api/subscription`, { planName });
      console.log("respons on the subscription creation", response)
      
      if (response.status === 200) {
        dispatch(setStatus(STATUS.SUCCESS)); 
        window.location.href = response.data.data.url;
      } else {
        dispatch(setStatus(STATUS.ERROR)); 
      }
    } catch (err) {
      dispatch(setStatus(STATUS.ERROR));  
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
    dispatch(setStatus(STATUS.LOADING)); 
    try {
      const response = await APIAuthenticated.get(`/api/subscription/check-active-subscription`);
      console.log("Backend response:", response); 
      if (response.status === 200) {
        const { data } = response.data; 
        dispatch(setSubscriptionData(data));
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



//delete subscription
export function removeSubscription(subscriptionId) {
  return async function removeSubscriptionThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await API.delete(`/api/subscription/${subscriptionId}`);
      if (response.status === 200) {
        dispatch(setDeleteSubscription({ subscriptionId }));
        dispatch(setStatus(STATUS.SUCCESS));
        toast.success("Subscription cancelled successfully.");
      } else {
        dispatch(setStatus(STATUS.ERROR));
        toast.error("Failed to cancel subscription.");
      }
    } catch (err) {
      console.error("Error deleting subscription:", err);
      dispatch(setStatus(STATUS.ERROR));
      toast.error("An error occurred during cancellation.");
    }
  };
}


//payment history
export function fetchPaymentHistory() {
  return async function fetchPaymentHistoryThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await APIAuthenticated.get(`/api/subscription/payment/history`);
      if (response.status === 200) {
        dispatch(setPaymentHistory(response.data.data));
        dispatch(setStatus(STATUS.SUCCESS));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}