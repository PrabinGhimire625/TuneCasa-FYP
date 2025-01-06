import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/enumStatus/Status";
import { API } from "../http/index";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    users: [],
    artists: [],
    status: STATUS.LOADING,
  },
  reducers: {
    setUserData(state, actions) {
      state.users = actions.payload;
    },
    setStatus(state, actions) {
      state.status = actions.payload;
    },
    setArtistData(state, action) {
      state.artists = action.payload;
    },
    approveArtist(state, action) {
      const artistId = action.payload;
      // Remove the approved artist from the pending artists list
      state.artists = state.artists.filter((artist) => artist._id !== artistId);
    },
    rejectArtist(state, action) {
      const artistId = action.payload;
      // Remove the rejected artist from the pending artists list
      state.artists = state.artists.filter((artist) => artist._id !== artistId);
    },
  },
});

export const { setUserData, setStatus, setArtistData, approveArtist, rejectArtist } = dataSlice.actions;
export default dataSlice.reducer;

// Fetch all users
export function fetchAllUser() {
  return async function fetchAllUserThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await API.get("/api/user");
      console.log(response);
      if (response.status === 200) {
        const { data } = response.data;
        console.log(data);
        dispatch(setUserData(data));
        dispatch(setStatus(STATUS.SUCCESS));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}

// Fetch all artists
export function fetchAllArtists() {
  return async function fetchAllArtistsThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await API.get("/api/user");
      console.log(response);
      if (response.status === 200) {
        const { data } = response.data;
        const artists = data.filter((user) => user.role === "artist");
        console.log(artists);
        dispatch(setArtistData(artists));
        dispatch(setStatus(STATUS.SUCCESS));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      console.log(err);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}

// Fetch all pending artists
export function fetchAllPendingArtists() {
  return async function fetchAllPendingArtistsThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await API.get("/api/artist/pendingArtist");
      console.log(response);
      if (response.status === 200) {
        const { data } = response.data;
        console.log(data);
        dispatch(setArtistData(data));
        dispatch(setStatus(STATUS.SUCCESS));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      console.error("Error fetching pending artists:", err);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}

// Approve artist
export function approveArtistHandler(artistId) {
  return async function approveArtistThunk(dispatch) {
    try {
      const response = await API.get(`/api/admin/approve-artist/${artistId}`);
      console.log('Approve Response:', response);
      if (response.status === 200) {
        // Approve artist by removing them from pending
        dispatch(approveArtist(artistId));
      }
    } catch (error) {
      console.error("Error approving artist:", error);
    }
  };
}

// Reject artist
export function rejectArtistHandler(artistId) {
  return async function rejectArtistThunk(dispatch) {
    try {
      const response = await API.get(`/api/admin/reject-artist/${artistId}`);
      console.log('Reject Response:', response);
      if (response.status === 200) {
        // Reject artist by removing them from pending
        dispatch(rejectArtist(artistId));
      }
    } catch (error) {
      console.error("Error rejecting artist:", error);
    }
  };
}
