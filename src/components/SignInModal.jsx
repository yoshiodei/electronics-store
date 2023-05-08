import React, { useState, useRef } from 'react';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { auth } from '../config/firebaseConfig';

export default function SignInModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signInModal = useRef();

  const dispatch = useDispatch();

  const provider = new GoogleAuthProvider();

  const handleEmailPasswordSignIn = (e) => {
    e.preventDefault();
    // signInModal.current.classList.toggle('show');

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        console.log('user detail:', user);
        toast.success('Sign in successful!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch((error) => {
        console.log('access denied:', error.message);
        toast.error(error.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  const handleGoogleSignIn = () => {
    console.log('cliqued');
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const { user } = result;
        toast.success('Sign in successful!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        console.log('token info', token, 'user detail!!', user.uid);
        dispatch(user.uid);
      }).catch((error) => {
        console.log('access denied', error.message);
        toast.error(error.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  return (
    <div ref={signInModal} className="modal fade" id="SignInModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="btn-close button-close-custom" data-bs-dismiss="modal" aria-label="Close" />
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
                  <input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <input placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <button type="submit" className="register-button">Sign In</button>
                </form>
                <p className="modal__custom-content-right__or-separator">-- or --</p>
                <button type="button" className="modal__custom-content-right__google-signin-button" onClick={handleGoogleSignIn}>
                  <i className="fa-brands fa-google" />
                  Sign In With Google
                </button>
                <h6 className="switch-to-signin">
                  Don&apos;t have an account?
                  {' '}
                  <button className="switch-to-signin__button" type="button" data-bs-toggle="modal" data-bs-target="#SignUpModal">Register</button>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
