import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  userId: '',
  followers: 0,
  displayName: '',
  userImage: '',
  rating: 1,
  bio: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN_DETAIL(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.followers = action.payload.followers;
      state.rating = action.payload.rating;
      state.displayName = action.payload.displayName;
      state.bio = action.payload.bio;
      state.userImage = action.payload.userImage;
    },
    RESET_LOGIN_DETAIL(state) {
      state.isLoggedIn = false;
      state.userId = '';
      state.followers = 0;
      state.displayName = '';
      state.userImage = '';
      state.rating = 1;
      state.bio = '';
    },
  },
});

export const { SET_LOGIN_DETAIL, RESET_LOGIN_DETAIL } = authSlice.actions;

export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
