import React, { useEffect, useState } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { doc, updateDoc } from '@firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../config/firebaseConfig';
import { errorToast, successToast } from '../../../utils/Toasts';
import EmailVerifySuccessBox from './EmailVerifySuccessBox';

export default function VerifyEmailBox({ userData }) {
  const navigate = useNavigate();

  const { email, uid } = userData;

  const [countdown, setCountdown] = useState(0);
  const [isMailSent, setIsMailSent] = useState(false);

  useEffect(() => {
    async function sendVerificationEmail() {
      sendEmailVerification(auth.currentUser)
        .then(() => {
          successToast('Email has been sent to your address');
          setIsMailSent(true);
          setCountdown(300);
        });
    }

    if (!auth?.currentUser?.emailVerified) {
      sendVerificationEmail();
    }
  }, []);

  const checkIfVerified = async () => {
    if (auth?.currentUser?.emailVerified) {
      setCountdown(0);
      const docRef = doc(db, 'vendors', uid);
      await updateDoc(docRef, {
        emailVerified: auth.currentUser.emailVerified,
      });
      // dispatch(setUserInfo({ ...userInfo, emailVerified: auth.currentUser.emailVerified }));
    }
  };

  const handleCheckVerified = () => {
    auth?.currentUser?.reload();
    if (!auth?.currentUser?.emailVerified) {
      errorToast('Your email has not been verified');
    }
    checkIfVerified();
  };

  useEffect(() => {
    let interval;
    auth?.currentUser?.reload();

    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
        checkIfVerified();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdown]);

  const formatTimer = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleResendEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        successToast('Email has been re-sent to your address');
      });
  };

  if (auth?.currentUser?.emailVerified) {
    return (
      <EmailVerifySuccessBox navigate={navigate} />
    );
  }

  return (
    <div className="main-section-div">
      <main className="main-section">
        <div className="verify-email-box__outer-div">
          <div className="verify-email-box">
            <div className="verify-email-box__title-div">
              <h4 className="verify-email-box__title-div__title">Verify Email</h4>
              <div className="verify-email-box__title-div__underline" />
            </div>
            <p className="verify-email-box__info-text">
              We have sent and email to
              {' '}
              <span>{email}</span>
            </p>
            <p className="verify-email-box__info-text">
              Just click on the link in the email sent to complete your signup.
              {' '}
              If you don&apos;t see the email, you may need to check the spam folder.
            </p>
            {(countdown > 0)
              && (
              <div>
                <h6 className="verify-email-box__countdown">{`${formatTimer(countdown)} left to verify email`}</h6>
              </div>
              )}
            {(isMailSent && (countdown === 0)) && (
              <div className="verify-email-box__resend-email-div">
                <button
                  type="button"
                  className="verify-email-box__resend-mail-button"
                  onClick={() => handleResendEmail()}
                >
                  Resend email
                </button>
                <button
                  type="button"
                  className="verification-box__approve-verification-button"
                  onClick={handleCheckVerified}
                >
                  Click here if you have verified your email
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

    </div>
  );
}
