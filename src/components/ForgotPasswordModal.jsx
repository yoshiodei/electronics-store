import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { auth } from '../config/firebaseConfig';

export default function ForgotPasswordModal({
  showModal,
  handleCloseForgotPasswordModal,
  handleShowSignInModal,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleCloseModal = () => {
    handleCloseForgotPasswordModal();
    setEmail('');
  };

  const handleResetPassword = () => {
    setIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Reset Mail Sent Successfully', {
          position: 'top-center',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setIsLoading(false);
        handleCloseModal();
      })
      .catch((error) => {
        toast.error(error.message, {
          position: 'top-center',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  const handleModalSwitch = () => {
    handleCloseModal();
    handleShowSignInModal();
  };

  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={handleCloseModal}
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Body>
        <button type="button" className="btn-close button-close-custom" aria-label="Close" onClick={handleCloseModal} />
        <div className="modal__custom-content d-flex">
          <div className="modal__custom-content-left">
            <div>
              <h2>Forgot Your Password?</h2>
              <div className="line" />
              <p>
                We&apos;ve got you covered.
                {' '}
                Provide your email and reset your password.
              </p>
            </div>
          </div>
          <div className="modal__custom-content-right reset-password">
            <form onSubmit={handleResetPassword} className="modal__custom-content-right-form">
              <input required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" className="register-button">{isLoading ? 'Loading...' : 'Sign In'}</button>
            </form>
            <h6 className="switch-to-signin">
              Don&apos;t have an account?
              {' '}
              <button className="switch-to-signin__button" type="button" onClick={handleModalSwitch}>Sign In</button>
            </h6>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
