import { createAction, createSlice } from '@reduxjs/toolkit';

export const setItemType = createAction('setItemType');

const initialState = {
  itemType: 'electronics',
};

const itemTypeSlice = createSlice({
  name: 'itemType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setItemType, (state, action) => {
        state.itemType = action.payload;
      });
  },
});

export const selectItemTypeState = (state) => state.itemType;

export default itemTypeSlice.reducer;
