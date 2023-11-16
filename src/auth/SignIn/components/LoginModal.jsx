/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { handleSwitchToForgotPassword, handleSwitchToSignUp } from '../../utils/SwitchModals';
import PhoneNumberVerifyInput from './PhoneNumberInput';
import { signInFormValidated } from '../../utils/FormValidated';
import { signInUserWithPhoneAndPassword, handleSignInWithGoogle } from '../../utils/authenticateUser';

export default function LoginModal(
  {
    showSignInModal,
    handleCloseSignInModal,
    handleShowRegisterModal,
    handleShowResetModal,
  },
) {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const initialState = { phoneNumber: '', password: '' };
  const initialCountryCode = {
    abbreviation: 'US',
    code: '+1',
  };

  const dispatch = useDispatch();

  const handleGoogleSignIn = () => {
    handleSignInWithGoogle(handleCloseSignInModal, dispatch, setGoogleLoading);
  };

  const [formData, setFormData] = useState(initialState);
  const [currentCountryCode, setCurrentCountryCode] = useState(initialCountryCode);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignIn = async () => {
    setIsSigningIn(true);

    const isFormValidated = await signInFormValidated(formData);

    if (isFormValidated) {
      signInUserWithPhoneAndPassword(
        currentCountryCode.code,
        formData.phoneNumber,
        formData.password,
        dispatch,
        setFormData,
        setCurrentCountryCode,
        handleCloseSignInModal,
      );
    }
    setIsSigningIn(false);
  };

  return (
    <Modal show={showSignInModal} onHide={handleCloseSignInModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h6 className="buttons-box__modal-title">Sign in</h6>
        </Modal.Title>
      </Modal.Header>
      <div className="buttons-box__modal">
        <Modal.Body>
          <div className="buttons-box__inner-modal-div buttons-box__inner-modal-div--alt">
            <PhoneNumberVerifyInput
              handleFormDataChange={handleChangeInput}
              currentCountryCode={currentCountryCode}
              setCurrentCountryCode={setCurrentCountryCode}
              formData={formData}
            />
            <div className="buttons-box__input-div">
              <label>Password</label>
              <input
                placeholder="Please enter your password"
                type="password"
                value={formData.password}
                onChange={handleChangeInput}
                name="password"
              />
            </div>
            <div className="buttons-box__forgot-password-div">
              <button
                type="button"
                onClick={
                    () => handleSwitchToForgotPassword(
                      handleCloseSignInModal,
                      handleShowResetModal,
                    )
                }
              >
                <h6>forgot password</h6>
              </button>
            </div>
            <p className="modal__custom-content-right__or-separator">-- or --</p>
            <button type="button" className="modal__custom-content-right__google-signin-button" onClick={handleGoogleSignIn}>
              <i className="fa-brands fa-google" />
              {googleLoading ? '...Loading' : 'Sign In With Google'}
            </button>
            <div className="buttons-box__switch-to-login-div signin">
              <h6>
                Don&apos;t have an account?
                {' '}
                <span
                  type="button"
                  className="buttons-box__switch-to-login-button"
                  onClick={
                    () => handleSwitchToSignUp(handleCloseSignInModal, handleShowRegisterModal)
                  }
                >
                  Sign Up
                </span>
              </h6>
            </div>
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <button
          className="buttons-box__sold-button"
          type="button"
          onClick={handleSignIn}
        >
          { isSigningIn ? '...loading' : 'Sign In'}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
