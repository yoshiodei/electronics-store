import React, { useState } from 'react';
// import RegisterForm from './components/RegisterForm';
import TermsAndConditionsModal from './components/TermsAndConditionsModal';
import SignUpForm from './components/SignUpForm';

export default function SignUpModal({
  handleShowRegisterModal,
  showRegisterModal,
  handleCloseRegisterModal,
  handleShowSignInModal,
}) {
  const [showTerms, setShowTerms] = useState(false);

  const handleCloseTerms = () => setShowTerms(false);
  const handleShowTerms = () => setShowTerms(true);

  return (
    <>
      {/* <RegisterForm
        showRegisterModal={showRegisterModal}
        handleCloseRegisterModal={handleCloseRegisterModal}
        handleShowSignInModal={handleShowSignInModal}
        handleShowTerms={handleShowTerms}
      /> */}
      <SignUpForm
        showRegisterModal={showRegisterModal}
        handleCloseRegisterModal={handleCloseRegisterModal}
        handleShowSignInModal={handleShowSignInModal}
        handleShowTerms={handleShowTerms}
      />
      <TermsAndConditionsModal
        showTerms={showTerms}
        handleCloseTerms={handleCloseTerms}
        handleShowRegisterModal={handleShowRegisterModal}
      />
    </>
  );
}
