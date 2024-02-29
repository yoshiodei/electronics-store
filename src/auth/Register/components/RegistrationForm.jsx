/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleRegisterUser from '../../utils/handleRegisterUser';
import handleValidateRegisterForm from '../../utils/registerFormValidation';
import TermsAndConditionsModal from './TermsAndConditionsModal';

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleCloseTerms = () => setShowTerms(false);
  const handleShowTerms = () => setShowTerms(true);

  const initialRegisterForm = {
    firstName: '', lastName: '', email: '', password: '', phoneNumber: '',
  };

  const [registerFormData, setRegisterFormData] = useState(initialRegisterForm);
  const [isTermsBoxChecked, setIsTermsBoxChecked] = useState(false);

  const handleChangeFormData = (e) => {
    const { value, name } = e.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const registerNewUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isFormValid = handleValidateRegisterForm(registerFormData, isTermsBoxChecked);

    if (isFormValid) {
      await handleRegisterUser(registerFormData, navigate);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="auth-form__outer-div">
        <form
          className="auth-form"
          onSubmit={registerNewUser}
        >
          <div className="auth-form__title-div">
            <h4 className="auth-form__title-div__title">Registration</h4>
            <div className="auth-form__title-div__underline" />
          </div>
          <div className="auth-form__div">
            <div className="auth-form__display-name-div">
              <div className="auth-form__input-div auth-form__input-div--first-name">
                <label>
                  First Name
                  {' '}
                  <span>*required</span>
                </label>
                <input
                  placeholder="please enter your first name"
                  value={registerFormData.firstName}
                  onChange={handleChangeFormData}
                  name="firstName"
                />
              </div>
              <div className="auth-form__input-div">
                <label>
                  Last Name
                </label>
                <input
                  placeholder="please enter your last name"
                  value={registerFormData.lastName}
                  onChange={handleChangeFormData}
                  name="lastName"
                />
              </div>
            </div>
            <div className="auth-form__input-div">
              <label>
                Email
                {' '}
                <span>*required</span>
              </label>
              <input
                type="email"
                placeholder="please enter your email"
                value={registerFormData.email}
                onChange={handleChangeFormData}
                name="email"
              />
            </div>
            <div className="auth-form__input-div">
              <label>
                Password
                {' '}
                <span>*required</span>
              </label>
              <input
                type="password"
                placeholder="please enter your password"
                value={registerFormData.password}
                onChange={handleChangeFormData}
                name="password"
              />
            </div>
            <div className="auth-form__input-div">
              <label>
                Phone number
              </label>
              <input
                placeholder="please enter your phone number"
                value={registerFormData.phoneNumber}
                onChange={handleChangeFormData}
                name="phoneNumber"
              />
            </div>
            <div className="auth-form__check-box-div">
              <input
                type="checkbox"
                checked={isTermsBoxChecked}
                name="isChecked"
                onChange={() => setIsTermsBoxChecked(!isTermsBoxChecked)}
              />
              <div className="auth-form__check-box-text-div">
                <h6>
                  I agree to all the
                  {' '}
                  <span
                    type="button"
                    className="buttons-box__terms-button"
                    onClick={
                      handleShowTerms
                    }
                  >
                    Terms &amp; Conditions
                  </span>
                </h6>
              </div>
            </div>
            <button
              className="auth-form__register-button"
              type="submit"
            >
              {loading ? '...loading' : 'Register Now'}
            </button>
            <h6 className="auth-form__switch-to-sign-in">
              Already have an account?
              {' '}
              <button
                className="auth-form__switch-to-sign-in__button"
                type="button"
                onClick={() => navigate('/sign-in')}
              >
                Sign In
              </button>
            </h6>
          </div>
        </form>
      </div>
      <TermsAndConditionsModal
        showTerms={showTerms}
        handleCloseTerms={handleCloseTerms}
      />
    </>
  );
}
