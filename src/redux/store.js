import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import wishListReducer from './slice/wishListSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  wishList: wishListReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
