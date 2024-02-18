import {
  collection, getDocs, query, where,
} from '@firebase/firestore';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../config/firebaseConfig';
import { errorToast } from '../../../utils/Toasts';
import handleGoogleSignIn from '../../utils/handleGoogleSignIn';

export default function SignInForm() {
  const navigate = useNavigate();

  const initialUserData = {
    email: '',
  };

  const [userData, setUserData] = useState(initialUserData);
  const [loading, setLoading] = useState(false);
  const [loadingGoogleSignIn, setLoadingGoogleSignIn] = useState(false);

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleEmailVerification = async () => {
    setLoading(true);
    const q = query(collection(db, 'vendors'), where('email', '==', userData.email));
    const querySnapshot = await getDocs(q);
    const userList = [];
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      console.log('users found', user);
      userList.push(user);
    });

    if (userList.length > 0) {
      const { uid } = userList[0];
      console.log('first user found', userList[0]);
      navigate(`/sign-in-verify-email/${uid}`);
      setLoading(false);
    } else {
      setLoading(false);
      errorToast('Email not found');
    }
  };

  const SignInWithGoogle = () => {
    setLoadingGoogleSignIn(true);
    handleGoogleSignIn(navigate);
    setLoadingGoogleSignIn(false);
  };

  return (
    <div className="auth-form__outer-div">
      <form
        className="auth-form"
      >
        <div className="auth-form__title-div">
          <h4 className="auth-form__title-div__title">Sign In</h4>
          <div className="auth-form__title-div__underline" />
        </div>
        <div className="auth-form__div">
          <div className="auth-form__input-div">
            <label>
              Email
            </label>
            <input
              placeholder="please enter your email"
              value={userData.email}
              onChange={handleDataChange}
              name="email"
            />
          </div>
          <button
            className="auth-form__register-button"
            type="button"
            onClick={handleEmailVerification}
          >
            {loading ? '...loading' : 'Next'}
          </button>
          <button
            className="auth-form__forgot-password-button"
            type="button"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password
          </button>
          <p className="auth-form__or-separator">-- or --</p>
          <button
            className="auth-form__google-button"
            type="button"
            onClick={SignInWithGoogle}
          >
            {loadingGoogleSignIn ? '...loading' : 'Sign In with Google'}
          </button>
          <h6 className="auth-form__switch-to-sign-in">
            Don&apos;t have an account?
            {' '}
            <button
              className="auth-form__switch-to-sign-in__button"
              type="button"
              onClick={() => navigate('/register')}
            >
              Register Now
            </button>
          </h6>
        </div>
      </form>
    </div>
  );
}
