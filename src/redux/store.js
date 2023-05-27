import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import wishListReducer from './slice/wishListSlice';
import chatReducer from './slice/chatSlice';
import productsReducer from './slice/productsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  wishList: wishListReducer,
  chat: chatReducer,
  products: productsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
