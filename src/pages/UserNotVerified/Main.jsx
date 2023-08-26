import React from 'react';
import AdPanel from '../../components/AdPanel';
import VerifyMessageBox from './components/VerifyMessageBox';

export default function Main() {
  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <VerifyMessageBox />
        </div>
      </main>
    </div>
  );
}
