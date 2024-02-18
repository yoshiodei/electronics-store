import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmailNotFoundBox() {
  const navigate = useNavigate();

  return (
    <div className="main-section-div">
      <main className="main-section">
        <div className="verify-email-box__outer-div">
          <div className="verify-email-box">
            <div className="verify-email-box__title-div">
              <h4 className="verify-email-box__title-div__title">Email not found</h4>
              <div className="verify-email-box__title-div__underline" />
            </div>
            <p className="verify-email-box__info-text">
              The user with the provided email cannot be found
            </p>
            <button
              type="button"
              className="verify-email-box__resend-email-button"
              onClick={() => navigate('/')}
            >
              Back to home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
