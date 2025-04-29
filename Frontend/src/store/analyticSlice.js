import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/enumStatus/Status";
import { APIAuthenticated } from "../http/index"; 

const analyticSlice = createSlice({
  name: "analytics",
  initialState: {
    songRecommendation: [],
    status: STATUS.IDLE, 
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setSongRecommendation(state, action) {
      state.songRecommendation = action.payload;
    },
  },
});

export const { setStatus, setSongRecommendation } = analyticSlice.actions;
export default analyticSlice.reducer;


// checkout 
export function songRecommendationByPastListeningHistory() {
    return async function songRecommendationByPastListeningHistoryThunk(dispatch) {
        dispatch(setStatus(STATUS.LOADING));
        try {
            const response = await APIAuthenticated.get(`/api/song-analytics/recommend/song/user`);
            console.log("Resposne",response)

            if (response.status === 200) {
                dispatch(setSongRecommendation(response.data.data));
                dispatch(setStatus(STATUS.SUCCESS));
            } else {
                dispatch(setStatus(STATUS.ERROR));
            }
        } catch (err) {
            console.error("Checkout error:", err);
            dispatch(setStatus(STATUS.ERROR));
        }
    };
}

