import { doc, getDoc } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../config/firebaseConfig';
import { errorToast, successToast } from '../../../utils/Toasts';
import LoadingEmailFormPage from './LoadingEmailFormPage';
import EmailNotFoundBox from './EmailNotFoundBox';

export default function EmailForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const docRef = doc(db, 'vendors', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        setLoading(false);
      } else {
        errorToast('user was not found');
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  const handleSignIn = () => {
    setSignInLoading(true);
    signInWithEmailAndPassword(auth, userData.email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        successToast('Sign in successful');
        setSignInLoading(false);
        if (userData.emailVerified) {
          navigate('/');
        } else {
          navigate(`/verify-email/${user.uid}`);
        }
      })
      .catch((err) => {
        setSignInLoading(false);
        switch (err.code) {
          case 'auth/user-mismatch':
            errorToast('Credentials provided do not match');
            break;
          case 'auth/missing-password':
            errorToast('Enter password to proceed');
            break;
          case 'auth/account-exists-with-different-credential':
            errorToast('Credentials provided do not match');
            break;
          case 'auth/wrong-password':
            errorToast('Credentials provided do not match');
            break;
          default:
            errorToast('Sorry, something went wrong try again');
            break;
        }
      });
  };

  if (loading) {
    return (
      <LoadingEmailFormPage />
    );
  }

  if (!loading && !userData?.email) {
    return (
      <EmailNotFoundBox />
    );
  }

  return (
    <div className="auth-form__outer-div">
      <form
        className="auth-form"
      >
        <div className="auth-form__title-div">
          <h4 className="auth-form__title-div__title">Welcome</h4>
          <div className="auth-form__title-div__sub-title-outer-div">
            <div className="auth-form__title-div__sub-title-div">
              <h6 className="auth-form__title-div__sub-title">{userData.email}</h6>
              <h6 className={userData.emailVerified ? 'auth-form__title-div__user-verified' : 'auth-form__title-div__user-not-verified'}>{userData.emailVerified ? 'verified' : 'not verified'}</h6>
            </div>
          </div>
          <div className="auth-form__title-div__underline" />
        </div>
        <div className="auth-form__div">
          <div className="auth-form__input-div">
            <label>
              Password
            </label>
            <input
              placeholder="please enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
          </div>
          <button
            className="auth-form__register-button"
            type="button"
            onClick={handleSignIn}
          >
            {signInLoading ? '...loading' : 'Sign In'}
          </button>
          <button
            className="auth-form__forgot-password-button"
            type="button"
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password
          </button>
          <h6 className="auth-form__switch-to-sign-in">
            This isn&apos;t your account?
            {' '}
            <button
              className="auth-form__switch-to-sign-in__button"
              type="button"
              onClick={() => navigate('/sign-in')}
            >
              back to Sign in
            </button>
          </h6>
        </div>
      </form>
    </div>
  );
}
