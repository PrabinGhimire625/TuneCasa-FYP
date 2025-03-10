import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/enumStatus/Status";
import { API } from "../http";

const authSlice=createSlice({
    name:"artist",
    initialState:{
        data:[],
        status : STATUS.LOADING,
    },
    reducers:{
        setStatus(state,action){
            state.status=action.payload
        },
        setArtistData(state, action){
            state.data=action.payload
        }
    }
})

export const {setArtistData,setStatus}=authSlice.actions
export default authSlice.reducer



// Fetch all artists
export function fetchAllArtists() {
    return async function fetchAllArtistsThunk(dispatch) {
      dispatch(setStatus(STATUS.LOADING));
      try {
        const response = await API.get("/api/artist");
        console.log(response);
        if (response.status === 200) {
          const { data } = response.data;
          dispatch(setArtistData(data));
          dispatch(setStatus(STATUS.SUCCESS));

        } else {
          dispatch(setStatus(STATUS.ERROR));
        }
      } catch (err) {
        dispatch(setStatus(STATUS.ERROR));
      }
    };
  }
  