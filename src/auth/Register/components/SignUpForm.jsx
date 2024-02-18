/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
// import PhoneNumberVerifyInput from './PhoneNumberVerifyInput';
import { handleSwitchToSignIn, handleSwitchTerms } from '../../utils/SwitchModals';
import { signUpFormValidated } from '../../utils/FormValidated';
import signUpUser from '../../utils/authenticateUser';
import logo from '../../../assets/images/electrotossLogoBlue.png';

export default function SignUpForm({
  showRegisterModal,
  handleCloseRegisterModal,
  handleShowSignInModal,
  handleShowTerms,
}) {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const dispatch = useDispatch();

  const handleFormDataChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async () => {
    setIsSigningUp(true);
    const isFormValidated = await signUpFormValidated(formData, isChecked);

    if (isFormValidated) {
      const isSignedUp = await signUpUser(formData, dispatch);

      if (isSignedUp) {
        setIsChecked(false);
        setFormData(initialState);
        handleCloseRegisterModal();
      }
    }

    setIsSigningUp(false);
  };

  return (
    <Modal show={showRegisterModal} onHide={handleCloseRegisterModal} centered>
      <div className="buttons-box__modal">
        <Modal.Body className="buttons-box__modal-body-custom">
          <div className="buttons-box__inner-modal-div buttons-box__inner-modal-div--alt register">
            <button title="close modal" type="button" onClick={handleCloseRegisterModal} className="buttons-box__inner-modal-div__close-button">
              <div />
              <div />
            </button>
            <div className="buttons-box__modal-logo-div">
              <img src={logo} className="buttons-box__modal-logo" alt="electrotoss logo" />
            </div>
            <div className="buttons-box__modal-title-div">
              <h4 className="buttons-box__modal-title">Register</h4>
            </div>
            <div className="buttons-box__input-outer-div">
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
            </div>
            <div className="buttons-box__input-div">
              <label>
                Email
                {' '}
                <span>*required</span>
              </label>
              <input
                placeholder="please enter your email"
                value={formData?.email}
                onChange={handleFormDataChange}
                name="email"
              />
            </div>
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
            <button
              className={`buttons-box__${isSigningUp ? 'register-button' : 'register-button--disabled'}`}
              type="button"
              onClick={handleSignUp}
              disabled={isSigningUp}
            >
              { isSigningUp ? '...loading' : 'Sign Up'}
            </button>
            <p className="modal__custom-content-right__or-separator">-- or --</p>
            <button
              type="button"
              className="modal__custom-content-right__google-signin-button"
              // onClick={handleGoogleSignIn}
            >
              <i className="fa-brands fa-google" />
              {false ? '...Loading' : 'Sign In With Google'}
            </button>
            <div className="buttons-box__switch-to-register-div">
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
          </div>
        </Modal.Body>
      </div>
      {/* <Modal.Footer>
        <button
          className={`buttons-box__${isPhoneVerified ? 'sold-button' : 'sold-button--disabled'}`}
          type="button"
          onClick={handleSignUp}
          disabled={!isPhoneVerified}
        >
          { isSigningUp ? '...loading' : 'Sign Up'}
        </button>
      </Modal.Footer> */}
    </Modal>
  );
}
