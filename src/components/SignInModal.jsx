import React, { useState } from 'react';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  // FacebookAuthProvider,
  // getAuth,
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
  handleShowRegisterModal,
}) {
  // const providerFB = new FacebookAuthProvider();
  const provider = new GoogleAuthProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleModalSwitch = () => {
    handleCloseSignInModal();
    handleShowRegisterModal();
  };

  const fetchUserInfo = async (uid) => {
    const docRef = doc(db, 'vendors', uid);
    const docSnapData = await getDoc(docRef);
    const userData = docSnapData.data();

    const userInfo = {
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
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('user data', result.user);
      const {
        displayName, photoURL, uid, phoneNumber, emailVerified, email: userEmail,
      } = result.user;

      const vendorDocRef = doc(db, 'vendors', uid);
      const docSnap = await getDoc(vendorDocRef);

      if (docSnap.exists()) {
        handleCloseSignInModal();
        fetchUserInfo(uid);
        successToast();
      } else {
        const vendorData = {
          displayName,
          bio: 'Hi there, this is my Tektoss shop page.',
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
          userInfoIsSet: true,
          displayName,
          bio: 'Hi there, this is my Tektoss shop page.',
          userEmail,
          followers: 0,
          rating: 1,
          phoneNumber: phoneNumber || '',
          photoURL: photoURL || '',
        };

        dispatch(setUserInfo(userInfo));

        successToast();
      }
    } catch (error) {
      setIsLoading(false);
      handleCloseSignInModal();
      errorToast(error);
    }
  };

  // const handleFacebookSignIn = async () => {
  //   const authFB = getAuth();
  //   signInWithPopup(authFB, providerFB)
  //     .then((resultFB) => {
  //       const userFB = resultFB.user;

  //       console.log('FB logged in user', userFB);
  //     })
  //     .catch((error) => {
  //       const errorMessage = error.message;
  //       console.log(errorMessage);
  //     });
  // };

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
            <form onSubmit={handleEmailPasswordSignIn}>
              <input required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input required placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className="register-button">{isLoading ? 'Loading...' : 'Sign In'}</button>
            </form>
            <p className="modal__custom-content-right__or-separator">-- or --</p>
            <button type="button" className="modal__custom-content-right__google-signin-button" onClick={handleGoogleSignIn}>
              <i className="fa-brands fa-google" />
              Sign In With Google
            </button>
            {/* <button type="button" className="modal__
            custom-content-right__facebook-signin-button" onClick={handleFacebookSignIn}>
              <i className="fa-brands fa-facebook" />
              Sign In With Facebook
            </button> */}
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
