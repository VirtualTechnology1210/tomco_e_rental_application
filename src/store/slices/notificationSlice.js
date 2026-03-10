import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  unreadCount: 0,
  notifications: []
};
const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setUnreadCount(state, action) {
      state.unreadCount = action.payload;
    },
    incrementUnread(state) {
      state.unreadCount += 1;
    },
    markAllRead(state) {
      state.unreadCount = 0;
      state.notifications = state.notifications.map((n) => ({ ...n, is_read: true }));
    },
    addNotification(state, action) {
      state.notifications = [action.payload, ...state.notifications];
      if (!action.payload.is_read) {
        state.unreadCount += 1;
      }
    },
    setNotifications(state, action) {
      state.notifications = action.payload;
    }
  }
});
const { setUnreadCount, incrementUnread, markAllRead, addNotification, setNotifications } = notificationSlice.actions;
var notificationSlice_default = notificationSlice.reducer;
export {
  addNotification,
  notificationSlice_default as default,
  incrementUnread,
  markAllRead,
  setNotifications,
  setUnreadCount
};
