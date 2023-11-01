/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  EmailAuthProvider,
  RecaptchaVerifier,
  linkWithCredential,
  signInWithPhoneNumber,
  updateProfile,
} from 'firebase/auth';
import {
  collection, doc, getDocs, query, setDoc, where,
} from '@firebase/firestore';
import { toast } from 'react-toastify';
import {
  auth,
  db,
} from '../../config/firebaseConfig';
import { setUserInfo } from '../../redux/slice/authSlice';
import TermsOfService from '../../pages/TermsAndConditions/components/TermsOfService';
import ModalLeftContent from './components/ModalLeftContent';

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

export default function SignUpModal({
  setShowRegisterModal,
  showRegisterModal,
  handleCloseRegisterModal,
  handleShowSignInModal,
}) {
  const dispatch = useDispatch();

  //   const [errorMessage, setErrorMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [codeInputMessage, setCodeInputMessage] = useState('');
  const [isVerifyCodeLoading, setIsVerifyCodeLoading] = useState(false);
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState('');

  const [showTerms, setShowTerms] = useState(false);

  const handleTermsClose = () => setShowTerms(false);
  //   const handleTermsShow = () => setShowTerms(true);

  const handleSwitchTerms = () => {
    setShowTerms(!showTerms);
    setShowRegisterModal(!showRegisterModal);
  };

  const initialValue = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
  };
  const [inputValue, setInputValue] = useState(initialValue);

  const handleSwitch = () => {
    handleCloseRegisterModal();
    handleShowSignInModal();
  };

  const checkUsers = async () => {
    try {
      const q = query(
        collection(db, 'vendors'),
        where('phoneNumber', '==', inputValue.phoneNumber),
      );

      const querySnapshot = await getDocs(q);
      const allVendors = [];
      querySnapshot.forEach((userDoc) => {
        const queryData = userDoc.data();
        allVendors.push({ ...queryData });
      });

      return allVendors.length;
    } catch (error) {
      errorToast(error.message);
      return 2;
    }
  };

  const isCheckFormFieldsValidated = async (userData) => {
    if (
      userData?.firstName?.trim().length < 1
      || userData?.phoneNumber?.trim().length < 1
      || userData?.password?.trim().length < 1
    ) {
      errorToast('Required fields cannot be left empty.');
      return false;
    }
    if (isNaN(userData?.phoneNumber)) {
      errorToast('Phone number field takes only numbers.');
      return false;
    }
    if (userData?.phoneNumber?.trim().length < 10) {
      errorToast('Phone number field should have at least 10 digits.');
      return false;
    }
    if (userData?.password?.trim().length < 8) {
      errorToast('Password should have at least 8 characters.');
      return false;
    }
    if (!isChecked) {
      errorToast('Accept Terms & Conditions to proceed.');
      return false;
    }
    if (await checkUsers() >= 2) {
      errorToast('Sorry an error occurred. Please try again.');
      return false;
    } if (await checkUsers() === 1) {
      errorToast('User with this phone number already exists.');
      return false;
    }
    return true;
  };

  const generateRecapture = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
      },
    }, auth);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    console.log(inputValue);
  };

  const handleSendVerificationCode = async () => {
    setIsVerifyCodeLoading(true);
    const formValidated = await isCheckFormFieldsValidated(inputValue);

    if (formValidated) {
      generateRecapture();
      const appVerifier = window.recaptchaVerifier;
      const number = `+1${inputValue.phoneNumber}`;

      signInWithPhoneNumber(auth, number, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          successToast('Verification code has been sent to your phone');
          setExpandForm(true);
          setIsVerifyCodeLoading(false);
        }).catch((error) => {
          setIsVerifyCodeLoading(false);
          console.log('the error code is', error);
          switch (error.code) {
            case 'auth/invalid-phone-number':
              errorToast('Phone number provided is not valid.');
              break;
            case 'auth/network-request-failed':
              errorToast('You are not connected to the internet.');
              break;
            default:
              errorToast('Sorry something went wrong. Try again');
              break;
          }
        });
    }

    setIsVerifyCodeLoading(false);
  };

  const handleVerifyCode = async () => {
    if (OTP.length === 6) {
      try {
        setIsLoading(true);

        const displayName = `${inputValue.firstName} ${inputValue.lastName}`;

        const { user } = await window.confirmationResult.confirm(OTP);

        const credential = EmailAuthProvider.credential(`${inputValue.phoneNumber}@electrotoss.com`, inputValue.password);

        linkWithCredential(auth.currentUser, credential)
          .then((usercred) => {
            console.log('Account linking success', usercred);
          }).catch((error) => {
            console.log('Account linking error', error);
          });

        await updateProfile(auth.currentUser, {
          displayName: displayName.trim(),
        });

        await setDoc(doc(db, 'vendors', user.uid), {
          displayName: displayName.trim(),
          email: `${inputValue.phoneNumber}@electrotoss.com`,
          emailVerified: user.emailVerified,
          bio: 'Hi there, this is my Electrotoss shop page.',
          followers: 0,
          photoURL: '',
          isPremium: false,
          rating: 1,
          uid: user.uid,
          status: 'active',
          createdAt: Date.now(),
          phoneNumber: inputValue?.phoneNumber,
          wishlist: [],
          chatList: [],
          messages: [],
          notifications: [],
        });

        const userInfo = {
          emailVerified: true,
          userInfoIsSet: true,
          displayName: displayName.trim(),
          bio: 'Hi there, this is my Electrotoss shop page.',
          email: `${inputValue.phoneNumber}@electrotoss.com`,
          followers: 0,
          rating: 1,
          phoneNumber: inputValue.phoneNumber,
          photoURL: '',
        };

        const dataToStore = { isAnonymous: false };
        const dataJSON = JSON.stringify(dataToStore);

        localStorage.setItem('isAnonymous', dataJSON);

        dispatch(setUserInfo(userInfo));

        setIsLoading(false);
        handleCloseRegisterModal();
        setExpandForm(false);
        setInputValue(initialValue);
        setOTP('');
        successToast('Congratulations, your account has been created');
      } catch (error) {
        setIsLoading(false);
        setOTP('');
        setExpandForm(false);
        errorToast('Sorry, your account could not be created');
        console.log(error.code);
      }
    }
  };

  const handleChangeOTP = (e) => {
    const otp = e.target.value;
    setOTP(otp);

    if (otp.length !== 6 || isNaN(otp)) {
      setCodeInputMessage('verification code must be 6 digits');
    } else {
      setCodeInputMessage('click button below to verify code');
    }
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
            <ModalLeftContent />
            <div className="modal__custom-content-right">
              <form>
                {
                expandForm === false
                  ? (
                    <div>
                      <input required placeholder="Enter your first name" name="firstName" value={inputValue.firstName} onChange={handleChange} />
                      <input placeholder="Enter your last name" name="lastName" value={inputValue.lastName} onChange={handleChange} />
                      <div className="buttons-box__phone-input-div">
                        <h6>+1</h6>
                        <input required className="buttons-box__phone-input" placeholder="Enter your phone number" name="phoneNumber" value={inputValue.phonNumber} onChange={handleChange} />
                      </div>
                      <input required placeholder="Enter password" name="password" type="password" value={inputValue.password} onChange={handleChange} />
                      <div className="check-box-div">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => { setIsChecked(!isChecked); }}
                        />
                        <h6>
                          By checking this box I agree to all the
                          {' '}
                          <button
                            type="button"
                            className="buttons-box__terms-button"
                            onClick={handleSwitchTerms}
                          >
                            <span
                              className="terms-and-conditions"
                              role="button"
                              onClick={handleCloseRegisterModal}
                            >
                              Terms and Conditions
                            </span>
                          </button>
                        </h6>
                      </div>
                    </div>
                  ) : null
}
                {
            expandForm === true
              ? (
                <div className="buttons-box__input-div buttons-box__input-div--otp">
                  <label>Verification Code</label>
                  <input
                    placeholder="please enter verification code"
                    className="buttons-box__otp"
                    value={OTP}
                    onChange={handleChangeOTP}
                  />
                  <p className={`buttons-box__${(OTP.length !== 6 || isNaN(OTP)) ? 'verification-error-message' : 'verification-success-message'}`}>
                    {codeInputMessage}
                  </p>
                </div>
              ) : null
            }
                {
                !expandForm
                  ? (
                    <button
                      type="button"
                      className="register-button"
                      onClick={handleSendVerificationCode}
                    >
                      {isVerifyCodeLoading ? 'Loading...' : 'Verify number'}
                    </button>
                  )
                  : (
                    <button
                      className="buttons-box__verify-button"
                      type="button"
                      disabled={isLoading}
                      onClick={handleVerifyCode}
                    >
                      { isLoading ? '...loading' : 'Verify Code'}
                    </button>
                  )
                }
                {/* <p className="register-button__error-message">{errorMessage}</p> */}
                <div id="recaptcha-container" />
                {
                expandForm === false
                  ? (
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
                  ) : null
}
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showTerms}
        onHide={handleTermsClose}
        centered
      >
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
            <button className="buttons-box__send-report-button" type="button" onClick={handleSwitchTerms}>
              Back to form
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
