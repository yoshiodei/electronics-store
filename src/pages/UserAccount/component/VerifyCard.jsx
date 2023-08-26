import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerifyCard() {
  const navigate = useNavigate();

  return (
    <div className="verification-card">
      <h4 className="verification-card__title">Your email has not been verified</h4>
      <button className="verification-card__button" type="button" onClick={() => navigate('/verify-user')}>Verify now</button>
    </div>
  );
}
