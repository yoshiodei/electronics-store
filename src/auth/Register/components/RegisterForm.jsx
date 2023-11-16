/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import PhoneNumberVerifyInput from './PhoneNumberVerifyInput';
import { handleSwitchToSignIn, handleSwitchTerms } from '../../utils/SwitchModals';
import { signUpFormValidated } from '../../utils/FormValidated';
import signUpUser from '../../utils/authenticateUser';

export default function RegisterForm({
  showRegisterModal,
  handleCloseRegisterModal,
  handleShowSignInModal,
  handleShowTerms,
}) {
  const initialState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    verificationCode: '',
  };

  const initialCountryCode = {
    abbreviation: 'US',
    code: '+1',
  };

  const [isChecked, setIsChecked] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [currentCountryCode, setCurrentCountryCode] = useState(initialCountryCode);

  const dispatch = useDispatch();

  const handleFormDataChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSignUp = async () => {
    setIsSigningUp(true);
    const isFormValidated = await signUpFormValidated(formData, isPhoneVerified, isChecked);

    if (isFormValidated) {
      const isSignedUp = await signUpUser(formData, dispatch, currentCountryCode.code);

      if (isSignedUp) {
        setIsChecked(false);
        setIsPhoneVerified(false);
        setFormData(initialState);
        setCurrentCountryCode(initialCountryCode);
        handleCloseRegisterModal();
      }
    }

    setIsSigningUp(false);
  };

  return (
    <Modal show={showRegisterModal} onHide={handleCloseRegisterModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h6 className="buttons-box__modal-title">Register</h6>
        </Modal.Title>
      </Modal.Header>
      <div className="buttons-box__modal">
        <Modal.Body>
          <div className="buttons-box__inner-modal-div buttons-box__inner-modal-div--alt register">
            <div className="buttons-box__input-div">
              <label>
                First Name
                {' '}
                <span>*required</span>
              </label>
              <input
                placeholder="please enter your first name"
                value={formData?.firstName}
                onChange={handleFormDataChange}
                name="firstName"
              />
            </div>
            <div className="buttons-box__input-div">
              <label>Last Name</label>
              <input
                placeholder="please enter your last name"
                value={formData?.lastName}
                onChange={handleFormDataChange}
                name="lastName"
              />
            </div>
            <PhoneNumberVerifyInput
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
            }
            <div className="buttons-box__input-div">
              <label>
                Password
                {' '}
                <span>*required</span>
              </label>
              <input
                placeholder="please enter your password"
                value={formData?.password}
                type="password"
                onChange={handleFormDataChange}
                name="password"
              />
            </div>
            <div className="buttons-box__check-box-div">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => { setIsChecked(!isChecked); }}
              />
              <div className="buttons-box__check-box-text-div">
                <h6>
                  I agree to all the
                  {' '}
                  <span
                    type="button"
                    className="buttons-box__terms-button"
                    onClick={
                      () => handleSwitchTerms(handleCloseRegisterModal, handleShowTerms)
                    }
                  >
                    Terms &amp; Conditions
                  </span>
                </h6>
              </div>
            </div>
            <div className="buttons-box__switch-to-login-div">
              <h6>
                Already have an account?
                {' '}
                <span
                  type="button"
                  className="buttons-box__switch-to-login-button"
                  onClick={
                    () => handleSwitchToSignIn(handleCloseRegisterModal, handleShowSignInModal)
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
          className={`buttons-box__${isPhoneVerified ? 'sold-button' : 'sold-button--disabled'}`}
          type="button"
          onClick={handleSignUp}
          disabled={!isPhoneVerified}
        >
          { isSigningUp ? '...loading' : 'Sign Up'}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
