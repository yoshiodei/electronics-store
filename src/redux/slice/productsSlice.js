import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  productsList: [],
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    SET_PRODUCTS_LIST(state, action) {
      state.productsList = action.payload;
    },
  },
});

export const { SET_PRODUCTS_LIST } = productsSlice.actions;

export const selectProductsState = (state) => state.products;

export default productsSlice.reducer;
