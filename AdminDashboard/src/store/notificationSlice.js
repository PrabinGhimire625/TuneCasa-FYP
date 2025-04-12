import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/enumStatus/Status";
import { API, APIAuthenticated } from "../http";


const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    unreadCount: 0,
    status: STATUS.LOADING,
  },
  reducers: {
    setNotificationData(state, action) {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(n => !n.isRead).length; // Recalculate unread count
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    clearUnreadCount(state) {
      state.unreadCount = 0; // Reset unread count
    }
  },
});

export const { setNotificationData, setStatus, clearUnreadCount } = notificationsSlice.actions;
export default notificationsSlice.reducer;

// Thunk to fetch notifications for the authenticated user
export function getEventAndMusicNotifications() {
  return async function (dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await API.get("/api/notification/songEvent");
      if (response.status === 200) {
        dispatch(setNotificationData(response.data.data)); // Update notifications and unread count
        dispatch(setStatus(STATUS.SUCCESS));
      } else {
        dispatch(setStatus(STATUS.ERROR));
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
      dispatch(setStatus(STATUS.ERROR));
    }
  };
}

// Mark all as read and refetch
export function markAllNotificationsAsRead() {
  return async function (dispatch) {
    try {
      const response = await APIAuthenticated.patch("/api/notification/read-all");
      if (response.status === 200) {
        dispatch(clearUnreadCount()); t
        // dispatch(getEventAndMusicNotifications()) here
      }
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    }
  };
}




