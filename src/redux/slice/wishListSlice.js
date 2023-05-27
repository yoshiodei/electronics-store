import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  doc, updateDoc, arrayUnion,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

const initialState = {
  isLoading: false,
  wishList: [],
  error: null,
};

export const addToWhishList = createAsyncThunk(
  'wishList/addToWishList',
  async (object, { rejectWithValue }) => {
    const { docId, ...objectData } = object;

    try {
      const wishListRef = doc(db, 'vendors', docId);

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
  async (docId, { rejectWithValue }) => {
    try {
      const docRef = doc(db, 'vendors', docId);
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
      const { docId, listArray } = objectData;
      const docRef = doc(db, 'vendors', docId);

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
          state.isLoading = false;
          state.wishList = [state.wishList, action.payload];
        },
      )
      .addCase(getWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishList = action.payload;
      })
      .addCase(getWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.wishList = action.payload;
      })
      .addCase(removeFromWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectWishListState = (state) => state.wishList;

export default wishListSlice.reducer;
