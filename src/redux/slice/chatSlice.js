import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  recipientDocId: '',
  recipientId: '',
  recipientImage: '',
  recipientName: '',
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    SET_RECIPIENT_CHAT_DETAILS(state, action) {
      state.isLoading = false;
      state.recipientDocId = action.payload.vendorDocId;
      state.recipientId = action.payload.vendorId;
      state.recipientImage = action.payload.vendor.image;
      state.recipientName = action.payload.vendor.displayName;
      state.error = null;
    },
    SET_CHAT_DETAILS(state, action) {
      state.isLoading = false;
      state.recipientDocId = action.payload.recipientDocId;
      state.recipientId = action.payload.recipientId;
      state.recipientImage = action.payload.recipientImage;
      state.recipientName = action.payload.recipientName;
      state.error = null;
    },
  },
});

export const { SET_RECIPIENT_CHAT_DETAILS, SET_CHAT_DETAILS } = chatSlice.actions;

export const selectChatState = (state) => state.chat;

export default chatSlice.reducer;
