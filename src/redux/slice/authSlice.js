import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isAnonymous: true,
  status: '',
  docId: '',
  userId: '',
  uid: '',
  followers: 0,
  displayName: '',
  userImage: '',
  photoURL: '',
  rating: 1,
  bio: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN_USER(state, action) {
      state.isAnonymous = false;
      state.uid = action.payload.uid;
    },
    SET_LOGIN_DETAIL(state, action) {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.docId = action.payload.docId;
      state.followers = action.payload.followers;
      state.rating = action.payload.rating;
      state.displayName = action.payload.displayName;
      state.bio = action.payload.bio;
      state.userImage = action.payload.userImage;
    },
    RESET_LOGIN_DETAIL(state) {
      state.isLoggedIn = false;
      state.isAnonymous = true;
      state.userId = '';
      state.docId = '';
      state.followers = 0;
      state.displayName = '';
      state.userImage = '';
      state.rating = 1;
      state.bio = '';
    },
  },
});

export const { SET_LOGIN_DETAIL, RESET_LOGIN_DETAIL, SET_LOGIN_USER } = authSlice.actions;

export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
