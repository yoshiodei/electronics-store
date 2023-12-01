import React, { useState } from 'react';
import LoginModal from './components/LoginModal';
import ForgotPasswordModal from '../ForgotPassword/ForgotPasswordModal';

export default function SignInModal({
  showSignInModal,
  handleCloseSignInModal,
  handleShowSignInModal,
  handleShowRegisterModal,
}) {
  const [showResetModal, setShowResetModal] = useState(false);

  const handleCloseResetModal = () => setShowResetModal(false);
  const handleShowResetModal = () => setShowResetModal(true);

  return (
    <>
      <LoginModal
        showSignInModal={showSignInModal}
        handleCloseSignInModal={handleCloseSignInModal}
        handleShowRegisterModal={handleShowRegisterModal}
        handleShowResetModal={handleShowResetModal}
      />

      <ForgotPasswordModal
        showResetModal={showResetModal}
        handleCloseResetModal={handleCloseResetModal}
        handleShowSignInModal={handleShowSignInModal}
      />
    </>
  );
}
