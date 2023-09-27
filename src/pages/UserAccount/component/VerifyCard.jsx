import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function VerifyCard() {
  const navigate = useNavigate();
  const { userInfo, loginInfo } = useSelector(selectAuthState);
  const { uid, isAnonymous } = loginInfo;
  const { emailVerified } = userInfo;
  const { id } = useParams();

  const emailVerifiedJSON = localStorage.getItem('emailVerified');
  const isAnonymousJSON = localStorage.getItem('isAnonymous');

  const verifiedEmail = JSON.parse(emailVerifiedJSON);
  const userAnonymous = JSON.parse(isAnonymousJSON);

  const userIsAnonymous = userAnonymous?.isAnonymous || isAnonymous;
  const userEmailIsVerified = verifiedEmail?.emailVerified || emailVerified;

  if (userIsAnonymous && (uid !== id)) {
    return null;
  }

  if (userEmailIsVerified) {
    return null;
  }

  return (
    <div className="verification-card">
      <h4 className="verification-card__title">
        Your email has not been verified
      </h4>
      <button className="verification-card__button" type="button" onClick={() => navigate('/verify-user')}>Verify now</button>
    </div>
  );
}
