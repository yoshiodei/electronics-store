import { createAction, createSlice } from '@reduxjs/toolkit';

export const setCoordinates = createAction('setCoordinates');

const initialState = {
  isLocationAvailable: false,
  coordinates: {
    longitude: 0,
    latitude: 0,
  },
  location: {
    state: '',
    town: '',
  },
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCoordinates, (state, action) => {
        state.filterObject = action.payload;
      });
  },
});

export const { SET_PRODUCTS_LIST } = locationSlice.actions;

export const selectProductsState = (state) => state.location;

export default locationSlice.reducer;
