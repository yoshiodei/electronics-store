import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RegisterModal from './RegisterModal';
import SignInModal from './SignInModal';
import { selectAuthState } from '../redux/slice/authSlice';

export default function SellNowButton() {
  const { loginInfo } = useSelector(selectAuthState);
  const { isAnonymous } = loginInfo;

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseSignInModal = () => setShowSignInModal(false);
  const handleShowSignInModal = () => setShowSignInModal(true);

  const isAnonymousJSON = localStorage.getItem('isAnonymous');

  const userAnonymous = JSON.parse(isAnonymousJSON);

  const userIsAnonymous = userAnonymous?.isAnonymous || isAnonymous;

  if (!userIsAnonymous) {
    return (
      <Link to="/new-item" className="sell-now">
        <h6>Sell Now</h6>
      </Link>
    );
  }

  return (
    <>
      <button type="button" className="btn btn-primary sell-now" onClick={handleShowSignInModal}>
        Sell Now
      </button>

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
