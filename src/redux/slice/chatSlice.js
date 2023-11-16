import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  recipientId: '',
  recipientImage: '',
  recipientName: '',
  chatRoomId: '',
  error: null,
  chatTemplate: {},
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    SET_RECIPIENT_CHAT_DETAILS(state, action) {
      state.isLoading = false;
      state.recipientId = action.payload.vendorId;
      state.recipientImage = action.payload.image;
      state.recipientName = action.payload.displayName;
      state.chatRoomId = action.payload.chatRoomId;
      // state.recipientId = action.payload.vendorId;
      // state.recipientImage = action.payload.vendor.image;
      // state.recipientName = action.payload.vendor.displayName;
      state.error = null;
    },
    SET_CHAT_DETAILS(state, action) {
      state.isLoading = false;
      state.recipientId = action.payload.recipientId;
      state.recipientImage = action.payload.recipientImage;
      state.recipientName = action.payload.recipientName;
      state.chatRoomId = action.payload.chatRoomId;
      state.error = null;
    },
    SET_CHAT_TEMPLATE(state, action) {
      state.chatTemplate = action.payload;
    },
    RESET_CHAT_TEMPLATE(state) {
      state.chatTemplate = {};
    },
  },
});

export const {
  SET_RECIPIENT_CHAT_DETAILS,
  SET_CHAT_DETAILS,
  SET_CHAT_TEMPLATE,
  RESET_CHAT_TEMPLATE,
} = chatSlice.actions;

export const selectChatState = (state) => state.chat;

export default chatSlice.reducer;
