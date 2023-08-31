import React, { useState } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  doc, setDoc, getDoc,
} from '@firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import { setUserInfo } from '../redux/slice/authSlice';

const successToast = () => {
  toast.success('Sign In Successful!', {
    position: 'top-center',
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

const errorToast = (err) => {
  toast.error(err.message, {
    position: 'top-center',
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export default function SignInModal({
  showSignInModal,
  handleCloseSignInModal,
  setForgotPasswordModal,
  handleShowRegisterModal,
}) {
  const provider = new GoogleAuthProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleModalSwitch = () => {
    handleCloseSignInModal();
    handleShowRegisterModal();
  };

  const handleForgotPasswordSwitch = () => {
    handleCloseSignInModal();
    setForgotPasswordModal(true);
  };

  const fetchUserInfo = async (uid) => {
    const docRef = doc(db, 'vendors', uid);
    const docSnapData = await getDoc(docRef);
    const userData = docSnapData.data();

    const userInfo = {
      emailVerified: userData.emailVerified,
      userInfoIsSet: true,
      displayName: userData.displayName,
      bio: userData.bio,
      email: userData.email,
      followers: userData.followers,
      rating: userData.rating,
      phoneNumber: userData.phoneNumber,
      photoURL: userData.photoURL,
    };

    dispatch(setUserInfo(userInfo));
  };

  const handleEmailPasswordSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const dataToStore = { isAnonymous: false };
        const dataToStore2 = { emailVerified: userCredential.user.emailVerified };
        const dataJSON = JSON.stringify(dataToStore);
        const dataJSON2 = JSON.stringify(dataToStore2);

        localStorage.setItem('isAnonymous', dataJSON);
        localStorage.setItem('emailVerified', dataJSON2);

        setIsLoading(false);
        const { uid } = userCredential.user;
        fetchUserInfo(uid);
        handleCloseSignInModal();
        successToast();
      })
      .catch((error) => {
        setIsLoading(false);
        handleCloseSignInModal();
        errorToast(error);
      });

    setEmail('');
    setPassword('');
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const result = await signInWithPopup(auth, provider);

      const {
        displayName, photoURL, uid, phoneNumber, emailVerified, email: userEmail,
      } = result.user;

      const vendorDocRef = doc(db, 'vendors', uid);
      const docSnap = await getDoc(vendorDocRef);

      const dataToStore = { isAnonymous: false };
      const dataToStore2 = { emailVerified };
      const dataJSON = JSON.stringify(dataToStore);
      const dataJSON2 = JSON.stringify(dataToStore2);

      localStorage.setItem('isAnonymous', dataJSON);
      localStorage.setItem('emailVerified', dataJSON2);

      if (docSnap.exists()) {
        handleCloseSignInModal();
        fetchUserInfo(uid);
        setGoogleLoading(false);
        successToast();
      } else {
        const vendorData = {
          displayName,
          bio: 'Hi there, this is my Electrotoss shop page.',
          followers: 0,
          status: 'active',
          photoURL: photoURL || '',
          isPremium: false,
          rating: 1,
          uid,
          userEmail,
          emailVerified,
          phoneNumber: phoneNumber || '',
          createdAt: Date.now(),
          wishlist: [],
          chatList: [],
          messages: [],
          notifications: [],
        };

        await setDoc(vendorDocRef, vendorData);
        handleCloseSignInModal();

        const userInfo = {
          emailVerified,
          userInfoIsSet: true,
          displayName,
          bio: 'Hi there, this is my Electrotoss shop page.',
          userEmail,
          followers: 0,
          rating: 1,
          phoneNumber: phoneNumber || '',
          photoURL: photoURL || '',
        };

        dispatch(setUserInfo(userInfo));

        successToast();
        setGoogleLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      handleCloseSignInModal();
      errorToast(error);
      setGoogleLoading(false);
    }
  };

  return (
    <Modal
      show={showSignInModal}
      size="lg"
      onHide={handleCloseSignInModal}
      aria-labelledby="example-custom-modal-styling-title"
    >
      <Modal.Body>
        <button type="button" className="btn-close button-close-custom" aria-label="Close" onClick={handleCloseSignInModal} />
        <div className="modal__custom-content d-flex">
          <div className="modal__custom-content-left">
            <div>
              <h2>Welcome Back</h2>
              <div className="line" />
              <p>
                Log in to access your account and explore
                {' '}
                the amazing experience our website has to offer.
              </p>
            </div>
          </div>
          <div className="modal__custom-content-right">
            <form onSubmit={handleEmailPasswordSignIn} className="modal__custom-content-right-form">
              <input required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" required placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className="register-button">{isLoading ? 'Loading...' : 'Sign In'}</button>
              <button type="button" className="modal__custom-content-right__forgot-password" onClick={handleForgotPasswordSwitch}>Forgot Password</button>
            </form>
            <p className="modal__custom-content-right__or-separator">-- or --</p>
            <button type="button" className="modal__custom-content-right__google-signin-button" onClick={handleGoogleSignIn}>
              <i className="fa-brands fa-google" />
              {googleLoading ? '...Loading' : 'Sign In With Google'}
            </button>
            <h6 className="switch-to-signin">
              Don&apos;t have an account?
              {' '}
              <button className="switch-to-signin__button" type="button" onClick={handleModalSwitch}>Register</button>
            </h6>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
