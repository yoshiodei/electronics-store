import { createAction, createSlice } from '@reduxjs/toolkit';

export const setNotificationCount = createAction('setNotificationCount');
export const setChatCount = createAction('setChatCount');
export const setNotifications = createAction('setNotifications');

const initialState = {
  notificationCount: 0,
  messageCount: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setNotifications, (state, action) => {
        state.notificationCount = action.payload.notificationCount;
        state.messageCount = action.payload.messageCount;
      })
      .addCase(setNotificationCount, (state) => {
        state.notificationCount += 1;
      })
      .addCase(setChatCount, (state, action) => {
        state.chatCount = action.payload;
      });
  },
});

// export const { RESET_LOGIN_DETAIL, SET_LOGIN_USER } = notificationSlice.actions;

export const selectNotificationState = (state) => state.notification;

export default notificationSlice.reducer;
