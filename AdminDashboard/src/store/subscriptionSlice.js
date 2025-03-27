import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/enumStatus/Status";
import { API } from "../http";


const subscriptionSlice = createSlice({
    name: "subscription",
    initialState: {
        subscription: [],
        currentMonthSubscriptionAmount:null,
        singleSubscription: null,
        status: STATUS.LOADING,
    },
    reducers: {
        setSubscriptionData(state, action) {
            state.subscription = action.payload;
        },
        setSingleSubscription(state, action) {
          state.singleSubscription = action.payload;
      },
        setCurrentMonthSubscriptionAmount(state, action) {
          state.currentMonthSubscriptionAmount = action.payload;
      },
        setStatus(state, action) {
            state.status = action.payload;
        }
    },
});

export const { setSubscriptionData, setStatus, setCurrentMonthSubscriptionAmount, setSingleSubscription } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

//get all subscription
export function listAllSubscription() {
  return async function listAllSubscriptionThunk(dispatch) {
      dispatch(setStatus(STATUS.LOADING));
      try {
          const response = await API.get("/api/subscription");
          if (response.status === 200) {
              const { data } = response.data;
              dispatch(setSubscriptionData(data));
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

//get total subscription for the current month
export function CalculateTotalSubscriptionAmount() {
  return async function CalculateTotalSubscriptionAmountThunk(dispatch) {
      dispatch(setStatus(STATUS.LOADING));
      try {
          const response = await API.get("/api/subscription/totalAmount-per-month");
          if (response.status === 200) {
              const { data } = response.data;
              dispatch(setCurrentMonthSubscriptionAmount(data));
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

//fetch single subscription
export function getSingleSubscription(id){
  return async function getSingleSubscriptionThunk(dispatch) {
      dispatch(setStatus(STATUS.LOADING));
      try{
      const response=await API.get(`/api/subscription/${id}`);
      if(response.status===200){
          const {data} =response.data;
          dispatch(setSingleSubscription(data));
          dispatch(setStatus(STATUS.SUCCESS));
      }
      else{
          dispatch(setStatus(STATUS.ERROR));  
      }
      }catch(err){
      dispatch(setStatus(STATUS.ERROR));  
      }  
  }
}