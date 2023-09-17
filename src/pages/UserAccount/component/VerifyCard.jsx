import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function VerifyCard() {
  const navigate = useNavigate();
  const { userInfo, loginInfo } = useSelector(selectAuthState);
  const { emailVerified } = userInfo;
  const { uid } = loginInfo;
  const { id } = useParams();

  const emailVerifiedJSON = localStorage.getItem('emailVerified');
  const isEmailVerified = JSON.parse(emailVerifiedJSON);

  if ((!isEmailVerified?.emailVerified || !emailVerified) && (uid === id)) {
    return null;
  }

  if (uid !== id) {
    return null;
  }

  return (
    <div className="verification-card">
      <h4 className="verification-card__title">
        Your email has not been verified
        { emailVerified }
      </h4>
      <button className="verification-card__button" type="button" onClick={() => navigate('/verify-user')}>Verify now</button>
    </div>
  );
}
