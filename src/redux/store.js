import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import wishListReducer from './slice/wishListSlice';
import chatReducer from './slice/chatSlice';
import productsReducer from './slice/productsSlice';
import notificationReducer from './slice/notificationSlice';
import locationReducer from './slice/locationSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  wishList: wishListReducer,
  chat: chatReducer,
  products: productsReducer,
  location: locationReducer,
  notification: notificationReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
