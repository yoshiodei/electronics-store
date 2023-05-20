import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, updateDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectAuthState } from './authSlice';
import { db } from '../../config/firebaseConfig';

const initialState = {
  wishList: [],
};

const { docId } = useSelector(selectAuthState);

const wishListRef = doc(db, 'vendor', docId);

export const updateWishlist = createAsyncThunk(
  'vendor/updateWishlist',
  async ({ vendorId, wishlist }) => {
    try {
      await updateDoc(wishListRef, {
        wishlist: true,
      });

      return { vendorId, wishlist };
    } catch (error) {
      throw new Error(`Error updating wishlist: ${error}`);
    }
  },
);

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
