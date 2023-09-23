import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function VerifyCard() {
  const navigate = useNavigate();
  const { loginInfo } = useSelector(selectAuthState);
  const { uid } = loginInfo;
  const { id } = useParams();

  const emailVerifiedJSON = localStorage.getItem('emailVerified');
  const { emailVerified } = JSON.parse(emailVerifiedJSON);

  const isAnonymousJSON = localStorage.getItem('isAnonymous');
  const { isAnonymous } = JSON.parse(isAnonymousJSON);

  if (isAnonymous && (uid !== id)) {
    return null;
  }

  if (emailVerified) {
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
