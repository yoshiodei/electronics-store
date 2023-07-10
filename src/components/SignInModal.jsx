import React, { useState } from 'react';
import {
  signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, FacebookAuthProvider, getAuth,
} from 'firebase/auth';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  collection, query, where, getDocs, doc, setDoc, getDoc,
} from '@firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
// import Toast from './Toast';
import { SET_LOGIN_DETAIL } from '../redux/slice/authSlice';

export default function SignInModal({
  showSignInModal,
  handleCloseSignInModal,
  handleShowRegisterModal,
}) {
  const providerFB = new FacebookAuthProvider();
  const provider = new GoogleAuthProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleModalSwitch = () => {
    handleCloseSignInModal();
    handleShowRegisterModal();
  };

  const handleEmailPasswordSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { user } = userCredential;

        const q = query(collection(db, 'vendors'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((docData) => {
          const data = docData.data();

          dispatch(SET_LOGIN_DETAIL({
            docId: user.uid,
            userId: user.uid,
            followers: data.followers,
            displayName: data.displayName,
            userImage: user.photoURL,
            rating: data.rating,
            bio: data.bio,
          }));
        });

        setIsLoading(false);

        handleCloseSignInModal();

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
      })
      .catch((error) => {
        setIsLoading(false);

        handleCloseSignInModal();

        toast.error(error.message, {
          position: 'top-center',
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('user data', result.user);
      const { displayName, photoURL, uid } = result.user;

      const vendorDocRef = doc(db, 'vendors', uid);

      const docSnap = await getDoc(vendorDocRef);

      if (docSnap.exists()) {
        const existingVendorObject = docSnap.data();
        dispatch(SET_LOGIN_DETAIL({ ...existingVendorObject, docId: uid, userImage: photoURL }));

        handleCloseSignInModal();

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
      } else {
        const vendorData = {
          displayName,
          bio: 'Hi there, this is my Tektoss shop page.',
          followers: 0,
          image: photoURL || '',
          isPremium: false,
          rating: 1,
          userId: uid,
          wishlist: [],
          chatList: [],
          messages: [],
        };

        const setLoginDetail = {
          userId: uid,
          docId: uid,
          followers: 0,
          rating: 1,
          displayName,
          bio: 'Hi there, this is my Tektoss shop page.',
          userImage: photoURL,
        };

        await setDoc(vendorDocRef, vendorData);
        dispatch(SET_LOGIN_DETAIL(setLoginDetail));

        handleCloseSignInModal();

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
      }
    } catch (error) {
      console.log('Error signing in with Google:', error);
    }
  };

  const handleFacebookSignIn = async () => {
    const authFB = getAuth();
    signInWithPopup(authFB, providerFB)
      .then((resultFB) => {
        const userFB = resultFB.user;

        console.log('FB logged in user', userFB);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
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
              <p>Lorem ipsum ini dolor kalaam sai imei hasman kanal ini sur.</p>
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
            <button type="button" className="modal__custom-content-right__facebook-signin-button" onClick={handleFacebookSignIn}>
              <i className="fa-brands fa-facebook" />
              Sign In With Facebook
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
