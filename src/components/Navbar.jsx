/* eslint-disable */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SellNowButton from './SellNowButton';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import DrawerButton from './DrawerButton';
import { signOut } from "firebase/auth";
import { auth } from '../config/firebaseConfig';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { SET_LOGIN_DETAIL, selectAuthState } from '../redux/slice/authSlice';

function Navbar() {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const navigate = useNavigate();

  console.log("this is the auth state", authState);

  const handleClickWishList = (e) => {
    navigate('/wish-list');
  }

  const handlePopOverClick = (name) => {
    setShowAccountModal(false);

    switch (name) {
      case 'my-account':
        navigate('/user-account');
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      case 'log-out':
        signOut(auth).then(() => {
          toast.success('Logout Successful', {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }).catch((error) => {
          toast.error(error.message, {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        });
        break;
      default:
        navigate('/');
        break;
    }

  }

  return (
    <>
      <nav className={toggleDrawer ? 'navbar-custom toggled':'navbar-custom'}>
        <div className="navbar-custom__top-div">
          <ul className="d-flex justify-content-end align-items-center">
            <li>
              <button className="navbar-custom__icon-button" title="notifications" onClick={() => navigate("/notifications")}>
                <i className="fa-regular fa-bell navbar-custom__icon" />
              </button>
            </li>
            <li>
              <button className="navbar-custom__icon-button" title="message" onClick={() => navigate("/chat-room")}>
                <i className="fa-regular fa-message navbar-custom__icon" />
              </button>
            </li>
            <li>
              <button className="navbar-custom__icon-button" title="wish list" onClick={handleClickWishList}>
                <i className="fa-regular fa-heart navbar-custom__icon" />
              </button>
            </li>
            <li>
              <div className="navbar-custom__user-account-div">
                <button className="navbar-custom__icon-button" title="user account" onClick={() => setShowAccountModal(!showAccountModal)}>
                  <i className="fa-regular fa-user navbar-custom__icon" />
                </button>
                <ul className={ !showAccountModal ? 'pop-over-hidden' : 'navbar-custom__user-account-div__pop-over'}>
                  <li>
                    <button name="my-account" onClick={() => handlePopOverClick("my-account")} role="button" className="navbar-custom__user-account-div__pop-over-button">
                      <i className="fa-solid fa-user" />
                      <h6>my account</h6>
                    </button>
                  </li>
                  <li>
                    <button name="log-out" onClick={() => handlePopOverClick("log-out")} role="button" className="navbar-custom__user-account-div__pop-over-button">
                      <i className="fa-sharp fa-solid fa-arrow-right-from-bracket" />
                      <h6>log out</h6>
                    </button>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <button className="navbar-custom__text-button" data-bs-toggle="modal" data-bs-target="#SignInModal">
                <h6>Sign In</h6>
              </button>
            </li>
            <li>
              <button className="navbar-custom__text-button" data-bs-toggle="modal" data-bs-target="#SignUpModal">
                <h6>Register Now</h6>
              </button>
            </li>
          </ul>
        </div>
        <div className="d-flex justify-content-between navbar-custom__bottom-div align-items-center">
          <Link to="/" className="h2 navbar-custom__brand">Tektoss</Link>
          <SellNowButton />
          <DrawerButton setToggleDrawer={setToggleDrawer} toggleDrawer={toggleDrawer} />
        </div>
      </nav>
      <SignInModal />
      <SignUpModal />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    name: state.reducer.products[0].name
  }
}

export default Navbar;