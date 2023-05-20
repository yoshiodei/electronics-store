import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishList: [],
};

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    ADD_TO_WISHLIST(state, action) {
      state.wishList = [...state.wishList, action.payload];
    },
  },
});

export const { ADD_TO_WISHLIST } = wishListSlice.actions;

export const selectWishListState = (state) => state.wishList;

export default wishListSlice.reducer;
