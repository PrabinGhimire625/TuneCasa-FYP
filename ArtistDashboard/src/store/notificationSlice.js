import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../globals/components/Status";
import { APIAuthenticated } from "../http";


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
      state.unreadCount = action.payload.filter(n => !n.isRead).length; 
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
export function fetchAllNotificationsOfArtist() {
  return async function (dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await APIAuthenticated.get("/api/notification/artist");
      console.log("response on the notification", response)
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
        dispatch(fetchAllNotificationsOfArtist()); // Refetch notifications after marking as read
        dispatch(clearUnreadCount()); // Reset unread count to 0 (if needed)
      }
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    }
  };
}
