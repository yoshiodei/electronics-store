import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import SingleItem from '../pages/SingleItem/SingleItem';
import '../styles/main.css';
import ChatRoom from '../pages/ChatRoom/ChatRoom';
import SearchResult from '../pages/SearchResult/SearchResult';
import UserAccount from '../pages/UserAccount/UserAccount';
import NewItem from '../pages/NewItem/NewItem';
import WishList from '../pages/WishList/WishList';
import Notifications from '../pages/Notifications/Notifications';
import Category from '../pages/Category/Category';
import Checkout from '../pages/CheckoutPage/CheckoutForm';
import EditProfile from '../pages/EditProfile/EditProfile';
import PaymentSuccess from '../pages/PaymentSucess/PaymentSuccess';

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:searchName" element={<SearchResult />} />
        <Route path="/single-item/:id" element={<SingleItem />} />
        <Route path="/chat-room" element={<ChatRoom />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/new-item" element={<NewItem />} />
        <Route path="/user-account/:id" element={<UserAccount />} />
        <Route path="/wish-list" element={<WishList />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/checkoutform" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
