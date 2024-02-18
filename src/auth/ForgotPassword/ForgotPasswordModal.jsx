/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
// import PhoneNumberVerifyInput from '../Register/components/PhoneNumberVerifyInput';
import { handleSwitchFromForgotPassword } from '../utils/SwitchModals';
import { passwordResetFormValidated } from '../utils/FormValidated';

export default function ForgotPasswordModal(
  {
    showResetModal,
    handleCloseResetModal,
    handleShowSignInModal,
  },
) {
  const initialState = {
    phoneNumber: '',
    password: '',
    verificationCode: '',
  };
  // const initialCountryCode = {
  //   abbreviation: 'US',
  //   code: '+1',
  // };

  const dispatch = useDispatch();

  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [formData, setFormData] = useState(initialState);
  // const [currentCountryCode, setCurrentCountryCode] = useState(initialCountryCode);

  // const handleFormDataChange = (e) => {
  //   const { value, name } = e.target;

  //   setFormData({ ...formData, [name]: value });
  // };

  const handleResetPassword = async () => {
    setIsPasswordSet(true);

    const isFormValidate = await passwordResetFormValidated(formData, isPhoneVerified);

    if (isFormValidate) {
      const passwordReset = await handleResetPassword(formData, dispatch);

      if (passwordReset) {
        setIsPhoneVerified(false);
        setFormData(initialState);
        // setCurrentCountryCode(initialCountryCode);
        handleCloseResetModal();
      }
    }

    setIsPasswordSet(false);
  };

  return (
    <Modal show={showResetModal} onHide={handleCloseResetModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h6 className="buttons-box__modal-title">Reset Password</h6>
        </Modal.Title>
      </Modal.Header>
      <div className="buttons-box__modal">
        <Modal.Body>
          <div className="buttons-box__inner-modal-div buttons-box__inner-modal-div--alt">
            {/* <PhoneNumberVerifyInput
              handleFormDataChange={handleFormDataChange}
              currentCountryCode={currentCountryCode}
              setCurrentCountryCode={setCurrentCountryCode}
              formData={formData}
              setIsPhoneVerified={setIsPhoneVerified}
            />
            {
            isPhoneVerified === true
              ? (
                <div className="buttons-box__input-div">
                  <label>Verification Code</label>
                  <input
                    placeholder="please enter verification code"
                    value={formData.verificationCode}
                    name="verificationCode"
                    onChange={handleFormDataChange}
                  />
                </div>
              ) : null
            } */}
            <div className="buttons-box__input-div">
              <label>Email</label>
              <input
                placeholder="Please enter your email"
                type="email"
                // value={formData.password}
                // onChange={handleFormDataChange}
                name="email"
              />
            </div>
            <div className="buttons-box__switch-to-login-div">
              <h6>
                Switch to sign in?
                {' '}
                <span
                  type="button"
                  className="buttons-box__switch-to-login-button"
                  onClick={
                    () => handleSwitchFromForgotPassword(
                      handleCloseResetModal,
                      handleShowSignInModal,
                    )
                  }
                >
                  Sign In
                </span>
              </h6>
            </div>
            <div id="recaptcha-container" />
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <button
          className="buttons-box__sold-button"
          type="button"
          onClick={handleResetPassword}
        >
          { isPasswordSet ? '...loading' : 'Reset password'}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
