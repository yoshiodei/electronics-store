/* eslint-disable */import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SellNowButton from './SellNowButton';
import SigninModal from './SigninModal';

export default function Navbar() {
  const [showAccountModal, setShowAccountModal] = useState(false);
  const navigate = useNavigate();

  const handleClickWishList = (e) => {
    navigate('/wish-list')
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
      case 'sign-in':
        break;
      default:
        navigate('/');
        break;
    }

  }

  return (
    <>
      <nav className="navbar-custom">
        <div className="navbar-custom__top-div">
          <ul className="d-flex justify-content-end align-items-center">
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
                    <button name="notifications" onClick={() => handlePopOverClick("notifications")} role="button" className="navbar-custom__user-account-div__pop-over-button">
                      <i className="fa-solid fa-bell" />
                      <h6>notifications</h6>
                    </button>
                  </li>
                  <li>
                    <button name="sign-in" onClick={() => handlePopOverClick("sign-in")} role="button" className="navbar-custom__user-account-div__pop-over-button"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <i className="fa-sharp fa-solid fa-arrow-right-to-bracket" />
                      <h6>sign in</h6>
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
          </ul>
        </div>
        <div className="d-flex justify-content-between navbar-custom__bottom-div align-items-center">
          <Link to="/" className="h2 navbar-custom__brand">Brand</Link>
          <SellNowButton />
        </div>
      </nav>
      <SigninModal />
    </>
  );
}
