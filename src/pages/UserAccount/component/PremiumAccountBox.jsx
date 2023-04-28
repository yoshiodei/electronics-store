import React from 'react';

export default function PremiumAccountBox() {
  return (
    <div className="premium-account-box">
      <p>
        Sign up for a premium account to enjoy a better experience on the platform.
        Click
        {' '}
        <span>here</span>
        {' '}
        to find out more.
      </p>
      <div className="premium-account-box__button">
        <h5>Upgrade to Premium</h5>
      </div>
    </div>
  );
}
