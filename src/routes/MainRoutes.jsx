import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
// import Home from '../pages/Home/Home';
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
import About from '../pages/AboutPage/About';
import TermsAndConditions from '../pages/TermsAndConditions/TermsAndConditions';
import FindCloserItems from '../pages/FindCloserItems/FindCloserItems';
import Test from '../pages/Test';
import EditItem from '../pages/EditItem/EditItem';
import UserNotVerified from '../pages/UserNotVerified/UserNotVerified';
import MobileChatRoom from '../pages/MobileChatRoom/MobileChatRoom';
import MobileChatWall from '../pages/MobileChatWall/MobileChatWall';
import WelcomePage from '../pages/WelcomePage/WelcomePage';

export default function MainRoutes() {
  useEffect(() => {
    ReactGA.initialize('G-J27ZXB98L6');
  }, []);

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
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<WelcomePage />} />
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
        <Route path="/about" element={<About />} />
        <Route path="/termsAndConditions" element={<TermsAndConditions />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/find-closer-items" element={<FindCloserItems />} />
        <Route path="/edit-single-item/:id" element={<EditItem />} />
        <Route path="/verify-user" element={<UserNotVerified />} />
        <Route path="/chatlist/mobile" element={<MobileChatRoom />} />
        <Route path="/chatwall/mobile" element={<MobileChatWall />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}
