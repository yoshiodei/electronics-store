import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN_DETAIL(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload;
    },
  },
});

export const { SET_LOGIN_DETAIL } = authSlice.actions;

export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
