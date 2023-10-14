import { createAction, createSlice } from '@reduxjs/toolkit';

export const setCoordinates = createAction('setCoordinates');
export const setUserLocation = createAction('setUserLocation');
export const setItemMile = createAction('setItemMile');

const initialState = {
  isLocationAvailable: false,
  coordinates: {
    longitude: 0,
    latitude: 0,
  },
  location: {
    state: '',
    town: '',
    country: '',
  },
  itemMile: 5,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCoordinates, (state, action) => {
        state.coordinates = action.payload.coordinates;
        state.isLocationAvailable = action.payload.isLocationAvailable;
      })
      .addCase(setUserLocation, (state, action) => {
        state.coordinates = action.payload.coordinates;
        state.location = action.payload.location;
        state.isLocationAvailable = action.payload.isLocationAvailable;
      })
      .addCase(setItemMile, (state, action) => {
        state.itemMile = action.payload;
      });
  },
});

export const selectLocationState = (state) => state.location;

export default locationSlice.reducer;
