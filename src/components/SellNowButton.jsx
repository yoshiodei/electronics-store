import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import SignInModal from './SignInModal';

export default function SellNowButton() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleCloseRegisterModal = () => setShowRegisterModal(false);
  const handleShowRegisterModal = () => setShowRegisterModal(true);
  const handleCloseSignInModal = () => setShowSignInModal(false);
  const handleShowSignInModal = () => setShowSignInModal(true);

  const isAnonymousJSON = localStorage.getItem('isAnonymous');
  const emailVerifiedJSON = localStorage.getItem('emailVerified');

  const { emailVerified } = JSON.parse(emailVerifiedJSON);
  const { isAnonymous } = JSON.parse(isAnonymousJSON);

  console.log(`emailVerified => ${emailVerified} : isAnonymous => ${isAnonymous}`);

  if (!isAnonymous && emailVerified) {
    return (
      <Link to="/new-item" className="sell-now">
        <h6>Sell Now</h6>
      </Link>
    );
  }

  if (!isAnonymous && !emailVerified) {
    return (
      <Link to="/verify-user" className="sell-now">
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
