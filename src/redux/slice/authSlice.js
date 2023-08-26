import { createAction, createSlice } from '@reduxjs/toolkit';

export const setUserId = createAction('setUserId');
export const setUserInfo = createAction('setUserInfo');

const initialState = {
  loginInfo: { isAnonymous: true, uid: '' },
  userInfo: {
    emailVerified: false,
    userInfoIsSet: false,
    displayName: '',
    bio: '',
    email: '',
    followers: '',
    rating: '',
    phoneNumber: '',
    photoURL: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUserInfo, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(setUserId, (state, action) => {
        state.loginInfo = action.payload;
      });
  },
});

export const { SET_LOGIN_DETAIL, RESET_LOGIN_DETAIL, SET_LOGIN_USER } = authSlice.actions;

export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
