import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import {
  doc, updateDoc, arrayUnion,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

export const setWishlistIds = createAction('setWishlistIds');

const initialState = {
  isLoading: false,
  wishList: [],
  wishlistIds: [],
  wishListCount: 0,
  error: null,
};

export const resetWishListCount = createAction('resetWishListCount');

export const addToWhishList = createAsyncThunk(
  'wishList/addToWishList',
  async (object, { rejectWithValue }) => {
    const { uid, ...objectData } = object;

    try {
      const wishListRef = doc(db, 'vendors', uid);

      await updateDoc(wishListRef, {
        wishlist: arrayUnion(objectData),
      });

      return objectData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getWishList = createAsyncThunk(
  'wishList/getWishList',
  async (uid, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'vendors', uid);
      const docSnap = await getDoc(docRef);

      const wishlist = docSnap.data()?.wishlist || [];

      return wishlist;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const removeFromWishList = createAsyncThunk(
  'wishList/removeFromWishList',
  async (objectData, { rejectWithValue }) => {
    try {
      const { uid, listArray } = objectData;
      const docRef = doc(db, 'vendors', uid);

      await updateDoc(docRef, {
        wishlist: listArray,
      });

      return listArray;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      addToWhishList.pending,
      (state) => {
        state.isLoading = true;
      },
    )
      .addCase(
        addToWhishList.fulfilled,
        (state, action) => {
          const newList = [state.wishList, action.payload];
          const oldList = state.wishList;
          state.isLoading = false;
          state.wishList = newList;
          if (state.wishList.length > oldList) {
            state.wishListCount += 1;
          }
        },
      )
      .addCase(getWishList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishList = action.payload;
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeFromWishList.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(setWishlistIds, (state, action) => {
        state.wishlistIds = action.payload;
      })
      .addCase(removeFromWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishList = action.payload;
      })
      .addCase(resetWishListCount, (state) => {
        state.wishListCount = 0;
      })
      .addCase(removeFromWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectWishListState = (state) => state.wishList;

export default wishListSlice.reducer;
