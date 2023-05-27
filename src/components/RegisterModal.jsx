import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from '../config/firebaseConfig';
import { SET_LOGIN_DETAIL } from '../redux/slice/authSlice';

export default function RegisterModal({
  showRegisterModal,
  handleCloseRegisterModal,
  handleShowSignInModal,
}) {
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState({
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    password: '',
    cPassword: '',
  });

  const handleSwitch = () => {
    handleCloseRegisterModal();
    handleShowSignInModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      password, cPassword, fname, lname, email, mobile,
    } = inputValue;

    if (password === '' || fname === '' || lname === '' || email === '' || mobile === '') {
      setErrorMessage('fields cannot be left empty');
    }
    if (password !== cPassword) {
      setErrorMessage('passwords do not match');
    }
    if (password.length < 8) {
      setErrorMessage('password must at least have 8 characters');
    } else {
      setIsLoading(true);

      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const { user } = userCredential;

          try {
            const docRef = await addDoc(collection(db, 'vendors'), {
              displayName: `${fname} ${lname}`,
              bio: 'Hi there, this is my Tektoss shop page.',
              followers: 0,
              image: '',
              isPremium: false,
              rating: 1,
              userId: user.uid,
              wishlist: [],
              chatList: [],
              messages: [],
            });
            console.log('Document written with ID: ', docRef.id);

            dispatch(SET_LOGIN_DETAIL({
              userId: user.uid,
              docId: user.uid,
              followers: 0,
              displayName: `${fname} ${lname}`,
              userImage: user.photoURL,
              rating: 1,
              bio: 'Hi there, this is my Tektoss shop page.',
            }));
          } catch (err) {
            console.error('Error adding document: ', e);
            setIsLoading(false);
            handleCloseRegisterModal();

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
          }

          setIsLoading(false);
          handleCloseRegisterModal();

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
        })
        .catch((error) => {
          console.log('error:', error.message);
          setIsLoading(false);
          handleCloseRegisterModal();
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
    }
  };

  return (
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
              <input required placeholder="Enter your mobile number" name="mobile" value={inputValue.mobile} onChange={handleChange} />
              <input required placeholder="Enter password" name="password" value={inputValue.password} onChange={handleChange} />
              <input required placeholder="Confirm password" name="cPassword" value={inputValue.cPassword} onChange={handleChange} />
              <div className="check-box-div">
                <input type="checkbox" />
                <h6>By checking this box I agree to all the terms and conditions</h6>
              </div>
              <button type="submit" className="register-button">{isLoading ? 'Loading...' : 'Register'}</button>
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
  );
}
