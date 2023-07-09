import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdPanel from '../../components/AdPanel';

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <div className="checkout__success-panel">
            <h1>Payment Successful</h1>
            <button
              type="button"
              className="checkout__success-button"
              onClick={() => navigate('/')}
            >
              Go Back to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
