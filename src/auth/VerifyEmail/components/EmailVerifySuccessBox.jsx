import React from 'react';

export default function EmailVerifySuccessBox({ navigate }) {
  return (
    <div className="main-section-div">
      <main className="main-section">
        <div className="verify-email-box__outer-div">
          <div className="verify-email-box verify-email-box--success">
            <div className="verify-email-box__title-div">
              <h4 className="verify-email-box__title-div__title">Email Verified Successfully</h4>
              <div className="verify-email-box__title-div__underline" />
            </div>
            <div className="verify-email-box__resend-email-div--verify">
              <p className="verify-email-box__resend-email-text">Congratulations, your email has been verified successfully, Click button below to proceed.</p>
              <button
                type="button"
                className="verify-email-box__resend-email-button verify-email-box__resend-email-button--success"
                onClick={() => navigate('/')}
              >
                Welcome to Nudiance
              </button>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
