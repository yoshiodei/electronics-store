import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {
  EmailAuthProvider,
  RecaptchaVerifier,
  // createUserWithEmailAndPassword,
  linkWithCredential,
  signInWithPhoneNumber,
  updateProfile,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import {
  collection, doc, getDocs, query, setDoc, where,
} from '@firebase/firestore';
import { useDispatch } from 'react-redux';
import { auth, db } from '../config/firebaseConfig';
import { setUserInfo } from '../redux/slice/authSlice';

const successToast = (mssg) => {
  toast.success(mssg, {
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

export default function MobileLoginModal({ showJoinModal, handleCloseMobileModal }) {
  const [expandForm, setExpandForm] = useState(false);
  const [codeInputMessage, setCodeInputMessage] = useState('');
  const [OTP, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const initialState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
  };
  const [signUpData, setSignUpData] = useState(initialState);
  const [isVerifyCodeLoading, setIsVerifyCodeLoading] = useState(false);

  const dispatch = useDispatch();

  const checkUsers = async () => {
    try {
      const q = query(
        collection(db, 'vendors'),
        where('phoneNumber', '==', signUpData.phoneNumber),
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
    } if (await checkUsers() >= 2) {
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

  const handleSignInDataChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    setSignUpData((prev) => ({ ...prev, [name]: value }));
    console.log(signUpData);
  };

  const handleSendVerificationCode = async () => {
    const formValidated = await isCheckFormFieldsValidated(signUpData);
    if (formValidated) {
      setIsVerifyCodeLoading(true);
      generateRecapture();
      const appVerifier = window.recaptchaVerifier;

      signInWithPhoneNumber(auth, signUpData.phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          successToast('Verification code has been sent to your phone');
          setExpandForm(true);
          setIsVerifyCodeLoading(false);
        }).catch((error) => {
          setIsVerifyCodeLoading(false);
          console.log('the error code is', error.code);
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
  };

  const handleVerifyCode = async () => {
    if (OTP.length === 6) {
      try {
        setIsLoading(true);

        const displayName = `${signUpData.firstName} ${signUpData.lastName}`;

        const { user } = await window.confirmationResult.confirm(OTP);

        const credential = EmailAuthProvider.credential(`${signUpData.phoneNumber}@electrotoss.com`, signUpData.password);

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
          email: `${signUpData.phoneNumber}@electrotoss.com`,
          emailVerified: user.emailVerified,
          bio: 'Hi there, this is my Nudiance shop page.',
          followers: 0,
          photoURL: '',
          isPremium: false,
          rating: 1,
          uid: user.uid,
          status: 'active',
          createdAt: Date.now(),
          phoneNumber: signUpData?.phoneNumber,
          wishlist: [],
          chatList: [],
          messages: [],
          notifications: [],
        });

        const userInfo = {
          emailVerified: true,
          userInfoIsSet: true,
          displayName: displayName.trim(),
          bio: 'Hi there, this is my Nudiance shop page.',
          email: `${signUpData.phoneNumber}@electrotoss.com`,
          followers: 0,
          rating: 1,
          phoneNumber: signUpData.phoneNumber,
          photoURL: '',
        };

        const dataToStore = { isAnonymous: false };
        const dataJSON = JSON.stringify(dataToStore);

        localStorage.setItem('isAnonymous', dataJSON);

        dispatch(setUserInfo(userInfo));

        setIsLoading(false);
        handleCloseMobileModal();
        setExpandForm(false);
        setSignUpData(initialState);
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
    <Modal show={showJoinModal} onHide={handleCloseMobileModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <h6>Join Us Today</h6>
        </Modal.Title>
      </Modal.Header>
      <div className="buttons-box__modal">
        <Modal.Body>
          <div className="buttons-box__inner-modal-div buttons-box__inner-modal-div--alt">
            <div className="buttons-box__input-div">
              <label>
                First Name
                {' '}
                <span>*required</span>
              </label>
              <input
                placeholder="please enter your first name"
                value={signUpData.firstName}
                onChange={handleSignInDataChange}
                name="firstName"
              />
            </div>
            <div className="buttons-box__input-div">
              <label>Last Name</label>
              <input
                placeholder="please enter your last name"
                value={signUpData.lastName}
                onChange={handleSignInDataChange}
                name="lastName"
              />
            </div>
            <div className="buttons-box__input-div">
              <label>
                Phone Number
                {' '}
                <span>*required</span>
              </label>
              <div className="buttons-box__inner-input-div">
                <h6>+1</h6>
                <input
                  placeholder="please enter your phone number"
                  value={signUpData.phoneNumber}
                  onChange={handleSignInDataChange}
                  name="phoneNumber"
                />
              </div>
            </div>
            <div className="buttons-box__input-div">
              <label>
                Password
                {' '}
                <span>*required</span>
              </label>
              <input
                placeholder="please enter your password"
                value={signUpData.password}
                type="password"
                onChange={handleSignInDataChange}
                name="password"
              />
            </div>
            {
            expandForm === true
              ? (
                <div className="buttons-box__input-div">
                  <label>Verification Code</label>
                  <input
                    placeholder="please enter verification code"
                    value={OTP}
                    onChange={handleChangeOTP}
                  />
                  <p className={`buttons-box__${(OTP.length !== 6 || isNaN(OTP)) ? 'verification-error-message' : 'verification-success-message'}`}>
                    {codeInputMessage}
                  </p>
                </div>
              ) : null
            }
            <div id="recaptcha-container" />
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer>
        { !expandForm ? (
          <button
            className="buttons-box__sold-button"
            type="button"
            onClick={handleSendVerificationCode}
          >
            { isVerifyCodeLoading ? '...loading' : 'Verify number'}
          </button>
        )
          : (
            <button
              className="buttons-box__sold-button"
              type="button"
              disabled={isLoading}
              onClick={handleVerifyCode}
            >
              { isLoading ? '...loading' : 'Verify Code'}
            </button>
          )}
        <button className="buttons-box__close-report-button" type="button" onClick={handleCloseMobileModal}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
}
