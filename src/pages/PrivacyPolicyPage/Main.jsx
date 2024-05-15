import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdPanel from '../../components/AdPanel';
import PrivacyPolicy from './components/PrivacyPolicy';

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <PrivacyPolicy />
          <button type="button" className="about__button" onClick={() => { window.scrollTo(0, 0); navigate('/'); }}>Go Back To Home</button>
        </div>
      </main>
    </div>
  );
}
