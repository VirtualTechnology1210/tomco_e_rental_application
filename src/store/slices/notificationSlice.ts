import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationItem } from '../../types/api.types';

interface NotificationState {
    unreadCount: number;
    notifications: NotificationItem[];
}

const initialState: NotificationState = {
    unreadCount: 0,
    notifications: [],
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setUnreadCount(state, action: PayloadAction<number>) {
            state.unreadCount = action.payload;
        },
        incrementUnread(state) {
            state.unreadCount += 1;
        },
        markAllRead(state) {
            state.unreadCount = 0;
            state.notifications = state.notifications.map((n) => ({ ...n, is_read: true }));
        },
        addNotification(state, action: PayloadAction<NotificationItem>) {
            state.notifications = [action.payload, ...state.notifications];
            if (!action.payload.is_read) {
                state.unreadCount += 1;
            }
        },
        setNotifications(state, action: PayloadAction<NotificationItem[]>) {
            state.notifications = action.payload;
        },
    },
});

export const { setUnreadCount, incrementUnread, markAllRead, addNotification, setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
