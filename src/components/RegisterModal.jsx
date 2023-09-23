/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import {
  auth,
  db,
} from '../config/firebaseConfig';
import { setUserInfo } from '../redux/slice/authSlice';
import TermsOfService from '../pages/TermsAndConditions/components/TermsOfService';

const successToast = () => {
  toast.success('Registration Successful!', {
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

export default function RegisterModal({
  showRegisterModal,
  handleCloseRegisterModal,
  handleShowSignInModal,
}) {
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState('');
  // const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [showTerms, setShowTerms] = useState(false);

  const handleTermsClose = () => setShowTerms(false);
  const handleTermsShow = () => setShowTerms(true);

  const handleAcceptTerms = () => {
    handleCloseRegisterModal();
    handleTermsShow();
  };

  const initialValue = {
    fname: '',
    lname: '',
    email: '',
    phoneNumber: '',
    password: '',
    cPassword: '',
  };
  const [inputValue, setInputValue] = useState(initialValue);

  const handleSwitch = () => {
    handleCloseRegisterModal();
    handleShowSignInModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  // const handleSubmit2 = (e) => {
  //   e.preventDefault();

  //   const {
  //     password, cPassword, fname, lname, email, phoneNumber,
  //   } = inputValue;

  //   if (password === '' || fname === '' || lname === '' || email === '' || phoneNumber === '') {
  //     setErrorMessage('fields cannot be left empty');
  //   }
  //   if (password !== cPassword) {
  //     setErrorMessage('passwords do not match');
  //   }
  //   if (password.length < 8) {
  //     setErrorMessage('password must at least have 8 characters');

  //   // if (!(isChecked)) {
  //   //   setErrorMessage('you must agree to terms and conditions to proceed');
  //   // }
  //   } else {
  //     setIsLoading(true);

  //     createUserWithEmailAndPassword(auth, email, password)
  //       .then(async (userCredential) => {
  //         const { user } = userCredential;

  //         const { emailVerified, uid } = user;

  //         try {
  //           await setDoc(doc(db, 'vendors', uid), {
  //             displayName: `${fname} ${lname}`,
  //             email,
  //             emailVerified,
  //             bio: 'Hi there, this is my Electrotoss shop page.',
  //             followers: 0,
  //             photoURL: '',
  //             isPremium: false,
  //             rating: 1,
  //             uid,
  //             status: 'active',
  //             createdAt: Date.now(),
  //             phoneNumber,
  //             wishlist: [],
  //             chatList: [],
  //             messages: [],
  //             notifications: [],
  //           });

  //           const userInfo = {
  //             emailVerified,
  //             userInfoIsSet: true,
  //             displayName: `${fname} ${lname}`,
  //             bio: 'Hi there, this is my Electrotoss shop page.',
  //             email,
  //             followers: 0,
  //             rating: 1,
  //             phoneNumber: '',
  //             photoURL: '',
  //           };

  //           const dataToStore = { isAnonymous: false };
  //           const dataToStore2 = { emailVerified: false };
  //           const dataJSON = JSON.stringify(dataToStore);
  //           const dataJSON2 = JSON.stringify(dataToStore2);

  //           localStorage.setItem('isAnonymous', dataJSON);
  //           localStorage.setItem('emailVerified', dataJSON2);

  //           dispatch(setUserInfo(userInfo));
  //         } catch (err) {
  //           setIsLoading(false);
  //           handleCloseRegisterModal();
  //           errorToast(err);
  //         }

  //         setIsLoading(false);
  //         handleCloseRegisterModal();
  //         successToast();
  //         setInputValue(initialValue);
  //       })
  //       .catch((error) => {
  //         setIsLoading(false);
  //         handleCloseRegisterModal();
  //         errorToast(error);
  //         setInputValue(initialValue);
  //       });
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      password, cPassword, fname, lname, email, phoneNumber,
    } = inputValue;

    if (password === '' || fname === '' || lname === '' || email === '' || phoneNumber === '') {
      setErrorMessage('fields cannot be left empty');
    }
    if (password !== cPassword) {
      setErrorMessage('passwords do not match');
    }
    if (password.length < 8) {
      setErrorMessage('password must at least have 8 characters');
    } else {
      setIsLoading(true);
      handleAcceptTerms();
      setIsLoading(false);
    }
  };

  const handleAcceptAndRegister = () => {
    setIsLoading(true);

    const {
      password, fname, lname, email, phoneNumber,
    } = inputValue;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { user } = userCredential;

        const { emailVerified, uid } = user;

        try {
          await setDoc(doc(db, 'vendors', uid), {
            displayName: `${fname} ${lname}`,
            email,
            emailVerified,
            bio: 'Hi there, this is my Electrotoss shop page.',
            followers: 0,
            photoURL: '',
            isPremium: false,
            rating: 1,
            uid,
            status: 'active',
            createdAt: Date.now(),
            phoneNumber,
            wishlist: [],
            chatList: [],
            messages: [],
            notifications: [],
          });

          const userInfo = {
            emailVerified,
            userInfoIsSet: true,
            displayName: `${fname} ${lname}`,
            bio: 'Hi there, this is my Electrotoss shop page.',
            email,
            followers: 0,
            rating: 1,
            phoneNumber: '',
            photoURL: '',
          };

          const dataToStore = { isAnonymous: false };
          const dataToStore2 = { emailVerified: false };
          const dataJSON = JSON.stringify(dataToStore);
          const dataJSON2 = JSON.stringify(dataToStore2);

          localStorage.setItem('isAnonymous', dataJSON);
          localStorage.setItem('emailVerified', dataJSON2);

          dispatch(setUserInfo(userInfo));
        } catch (err) {
          setIsLoading(false);
          handleTermsClose();
          errorToast(err);
        }

        setIsLoading(false);
        handleTermsClose();
        successToast();
        setInputValue(initialValue);
      })
      .catch((error) => {
        setIsLoading(false);
        handleTermsClose();
        errorToast(error);
        setInputValue(initialValue);
      });
  };

  return (
    <>
      <Modal
        show={showRegisterModal}
        size="lg"
        onHide={handleCloseRegisterModal}
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Body>
          <button type="button" className="btn-close button-close-custom" aria-label="Close" onClick={handleCloseRegisterModal} />
          <div className="modal__custom-content d-flex">
            <div className="modal__custom-content-left">
              <div>
                <h2>Welcome</h2>
                <div className="line" />
                <p>Create an account today and start selling now on our amazing platform.</p>
              </div>
            </div>
            <div className="modal__custom-content-right">
              <form onSubmit={handleSubmit}>
                <input required placeholder="Enter first name" name="fname" value={inputValue.fname} onChange={handleChange} />
                <input required placeholder="Enter last name" name="lname" value={inputValue.lname} onChange={handleChange} />
                <input required placeholder="Enter your email" name="email" value={inputValue.email} onChange={handleChange} />
                <input required placeholder="Enter your phone number number" name="phoneNumber" value={inputValue.phonNumber} onChange={handleChange} />
                <input required placeholder="Enter password" name="password" type="password" value={inputValue.password} onChange={handleChange} />
                <input required placeholder="Confirm password" name="cPassword" type="password" value={inputValue.cPassword} onChange={handleChange} />
                {/* <div className="check-box-div">
                <input type="checkbox" checked={isChecked}
                onChange={() => { setIsChecked(!isChecked); }} />
                <h6>
                  By checking this box I agree to all the
                  {' '}
                  <Link to="/termsAndConditions"><span
                  className="terms-and-conditions" role="button"
                  onClick={handleCloseRegisterModal}>Terms and Conditions</span></Link>
                </h6>
              </div> */}
                <button type="submit" className="register-button">{isLoading ? 'Loading...' : 'Next'}</button>
                <p className="register-button__error-message">{errorMessage}</p>
                <h6 className="switch-to-signin">
                  Already have an account?
                  {' '}
                  <button
                    className="switch-to-signin__button"
                    type="button"
                    onClick={handleSwitch}
                  >
                    Sign In
                  </button>
                </h6>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showTerms} onHide={handleTermsClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <h6>Terms and Conditions</h6>
          </Modal.Title>
        </Modal.Header>
        <div className="buttons-box__modal">
          <Modal.Body>
            <div className="modal__custom-content__terms-body">
              <TermsOfService />
            </div>
          </Modal.Body>
        </div>
        <Modal.Footer>
          <div className="modal__custom-content__footer-div">
            <button className="buttons-box__send-report-button" type="button" onClick={handleAcceptAndRegister}>
              {isLoading ? '...Loading' : 'I accept the terms and conditions'}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
