import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendEmailVerification } from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, updateDoc } from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { selectAuthState, setUserInfo } from '../../../redux/slice/authSlice';
import { auth, db } from '../../../config/firebaseConfig';

export default function VerifyMessageBox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);

  const { userInfo, loginInfo } = useSelector(selectAuthState);
  const { emailVerified, email } = userInfo;
  const { uid } = loginInfo;

  const [countdown, setCountdown] = useState(0);

  const checkIfVerified = async () => {
    if (auth.currentUser.emailVerified) {
      setCountdown(0);
      const docRef = doc(db, 'vendors', uid);
      await updateDoc(docRef, {
        emailVerified: auth.currentUser.emailVerified,
      });
      dispatch(setUserInfo({ ...userInfo, emailVerified: auth.currentUser.emailVerified }));
    }
  };

  const handleVerify = () => {
    setIsSending(true);
    if (!emailVerified) {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          setIsMailSent(true);
          toast.success('Verification email sent successfully!', {
            position: 'top-center',
            autoClose: 3500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          setIsSending(false);
          setCountdown(60);
        });
    }
    setIsSending(false);
  };

  const startCountdown = () => {
    handleVerify();
  };

  useEffect(() => {
    let interval;
    auth.currentUser.reload();

    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
        checkIfVerified();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdown]);

  if (emailVerified) {
    return (
      <div className="verification-box--success">
        <h2 className="verification-box__title">Your email has been verified</h2>
        <p className="verification-box__text">
          You can now post ads on this platform for free.
        </p>
        <div className="verification-box__buttons-div">
          <button
            type="button"
            className="verification-box__send-verification-button--success"
            onClick={() => navigate('/new-item')}
          >
            Start Posting
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="verification-box">
      <h2 className="verification-box__title">Your Email is not Verified</h2>
      <p className="verification-box__text">
        {`In order to post a new item, you would need to have your account email verified.
          Click on the button below to send an email to your email "${email}". Do check your spam box if mail does not appear in the inbox.`}
      </p>
      <div className="verification-box__buttons-div">
        <button
          type="button"
          className="verification-box__send-verification-button"
          onClick={startCountdown}
          disabled={countdown > 0}
        >
          {isSending ? '...SendingSend' : 'Verification Email'}
        </button>
        {(countdown > 0)
          && (
            <div>
              <h4 className="verification-box__countdown">{countdown}</h4>
              <h6 className="verification-box__countdown">Seconds left to verify email</h6>
            </div>
          )}
        {(isMailSent && (countdown === 0)) && (
        <button
          type="button"
          className="verification-box__approve-verification-button"
          onClick={checkIfVerified}
        >
          Click here if you have verified
        </button>
        )}
      </div>
    </div>
  );
}
