import { createAction, createSlice } from '@reduxjs/toolkit';

export const setFilter = createAction('setFilter');
export const setCategoryFilter = createAction('setCategoryFilter');
export const setCoordinate = createAction('setCoordinate');
export const resetFilter = createAction('resetFilter');
export const resetCategoryFilter = createAction('resetCategoryFilter');
export const emptyProductsList = createAction('emptyProductsList');
export const fillProductsList = createAction('fillProductsList');
export const setPromotedItem = createAction('setPromotedItem');

const initialFilter = {
  maxPrice: 10000,
  minPrice: 0,
  location: 'all',
  category: 'all',
  condition: 'all',
  brand: 'all',
  updateTime: 0,
};

const initialState = {
  isLoading: false,
  productsList: [],
  filterObject: initialFilter,
  filterCategoryObject: initialFilter,
  userCoordinates: { longitude: 0, latitude: 0 },
  promotedItem: {},
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
      .addCase(setCategoryFilter, (state, action) => {
        state.filterCategoryObject = action.payload;
      })
      .addCase(setPromotedItem, (state, action) => {
        state.promotedItem = action.payload;
      })
      .addCase(resetCategoryFilter, (state) => {
        state.filterCategoryObject = initialFilter;
      })
      .addCase(emptyProductsList, (state) => {
        state.productsList = [];
      })
      .addCase(setCoordinate, (state, action) => {
        state.userCoordinates = action.payload;
      })
      .addCase(fillProductsList, (state, action) => {
        state.productsList = action.payload;
      });
  },
});

export const { SET_PRODUCTS_LIST } = productsSlice.actions;

export const selectProductsState = (state) => state.products;

export default productsSlice.reducer;
