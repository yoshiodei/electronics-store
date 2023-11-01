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
import { auth, db } from '../../config/firebaseConfig';
import { setUserInfo } from '../../redux/slice/authSlice';
import ModalLeftContent from './components/ModalLeftContent';

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
  toast.error(err, {
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
  // setForgotPasswordModal,
  handleShowRegisterModal,
}) {
  const provider = new GoogleAuthProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleModalSwitch = () => {
    handleCloseSignInModal();
    handleShowRegisterModal();
  };

  // const handleForgotPasswordSwitch = () => {
  //   handleCloseSignInModal();
  //   setForgotPasswordModal(true);
  // };

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

  const handlePhoneNumberPasswordSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userNumber = phoneNumber.charAt(0) === '+' ? `${phoneNumber}@electrotoss.com` : `+233${phoneNumber}@electrotoss.com`;

    signInWithEmailAndPassword(auth, userNumber, password)
      .then((userCredential) => {
        const dataToStore = { isAnonymous: false };
        const dataJSON = JSON.stringify(dataToStore);
        localStorage.setItem('isAnonymous', dataJSON);

        setIsLoading(false);
        const { uid } = userCredential.user;
        fetchUserInfo(uid);
        setPhoneNumber('');
        setPassword('');
        handleCloseSignInModal();
        successToast();
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error.code);
        switch (error.code) {
          case 'auth/user-not-found':
            errorToast('User not found.');
            break;
          case 'auth/network-request-failed':
            errorToast('You are not connected to the internet.');
            break;
          default:
            errorToast('Sorry something went wrong. Try again');
            break;
        }
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const result = await signInWithPopup(auth, provider);

      const {
        displayName, photoURL, uid, emailVerified, email: userEmail,
      } = result.user;

      const vendorDocRef = doc(db, 'vendors', uid);
      const docSnap = await getDoc(vendorDocRef);

      const dataToStore = { isAnonymous: false };
      const dataJSON = JSON.stringify(dataToStore);

      localStorage.setItem('isAnonymous', dataJSON);

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
          phoneNumber: '',
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
      errorToast('Something went wrong, Please try again');
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
          <ModalLeftContent />
          <div className="modal__custom-content-right">
            <form onSubmit={handlePhoneNumberPasswordSignIn} className="modal__custom-content-right-form">
              <input required placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              <input type="password" required placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className="register-button">{isLoading ? 'Loading...' : 'Sign In'}</button>
              {/* <button
            type="button"
            className="modal__custom-content-right__forgot-password"
            onClick={handleForgotPasswordSwitch}
          >
            Forgot Password
          </button> */}
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
