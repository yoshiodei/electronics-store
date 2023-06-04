import { createAction, createSlice } from '@reduxjs/toolkit';

export const setFilter = createAction('setFilter');
export const resetFilter = createAction('resetFilter');
export const emptyProductsList = createAction('emptyProductsList');
export const fillProductsList = createAction('fillProductsList');

const initialFilter = {
  maxPrice: 10000,
  minPrice: 0,
  location: 'all',
  category: 'all',
  condition: 'all',
  updateTime: 0,
};

const initialState = {
  isLoading: false,
  productsList: [],
  filterObject: initialFilter,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setFilter, (state, action) => {
        state.filterObject = action.payload;
      })
      .addCase(resetFilter, (state) => {
        state.filterObject = initialFilter;
      })
      .addCase(emptyProductsList, (state) => {
        state.productsList = [];
      })
      .addCase(fillProductsList, (state, action) => {
        state.productsList = action.payload;
      });
  },
});

export const { SET_PRODUCTS_LIST } = productsSlice.actions;

export const selectProductsState = (state) => state.products;

export default productsSlice.reducer;
