import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegisterModal from './RegisterModal';
import SignInModal from './SignInModal';
import { selectAuthState } from '../redux/slice/authSlice';

export default function SellNowButton() {
  const { loginInfo, userInfo } = useSelector(selectAuthState);
  const { isAnonymous } = loginInfo;
  const { emailVerified } = userInfo;

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseSignInModal = () => setShowSignInModal(false);
  const handleShowSignInModal = () => setShowSignInModal(true);

  return (
    <>
      { !isAnonymous && (emailVerified === true)
        && (
        <Link to="/new-item" className="sell-now">
          <h6>Sell Now</h6>
        </Link>
        )}
      { !isAnonymous && (emailVerified === false)
        && (
        <Link to="/verify-user" className="sell-now">
          <h6>Sell Now</h6>
        </Link>
        )}
      { isAnonymous
        && (
        <button type="button" className="btn btn-primary sell-now" onClick={handleShowSignInModal}>
          Sell Now
        </button>
        )}
      <RegisterModal
        handleCloseRegisterModal={handleCloseRegisterModal}
        showRegisterModal={showRegisterModal}
        handleShowSignInModal={handleShowSignInModal}
      />
      <SignInModal
        handleCloseSignInModal={handleCloseSignInModal}
        showSignInModal={showSignInModal}
        handleShowRegisterModal={handleShowRegisterModal}
      />
    </>
  );
}
