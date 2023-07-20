import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>
            Payment Successful
          </ContentInfoBox>
          <div className="checkout__success-message">
            <h3>Your promoted item will be uploaded once the item in approved after review.</h3>
            <button
              type="button"
              className="checkout__success-button"
              onClick={() => navigate('/')}
            >
              Go Back Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
