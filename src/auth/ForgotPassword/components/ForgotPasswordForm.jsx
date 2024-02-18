import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import handleResetPassword from '../../utils/handleResetPassword';

export default function ForgotPasswordForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    handleResetPassword(email, setEmail, navigate);
    setLoading(false);
  };

  return (
    <div className="auth-form__outer-div">
      <form
        className="auth-form auth-form--forgot-password"
        onSubmit={handleSubmit}
      >
        <div className="auth-form__title-div">
          <h4 className="auth-form__title-div__title">Forgot Password</h4>
          <div className="auth-form__title-div__underline" />
        </div>
        <div className="auth-form__div">
          <div className="auth-form__input-div">
            <label>
              Email
            </label>
            <input
              type="email"
              placeholder="please enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            className="auth-form__register-button"
            type="submit"
          >
            {loading ? '...loading' : 'Send Email'}
          </button>
          <h6 className="auth-form__switch-to-sign-in">
            Switch to Sign In?
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
  );
}
