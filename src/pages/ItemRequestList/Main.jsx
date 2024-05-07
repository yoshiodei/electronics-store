import React from 'react';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';
import DisplayRequests from './components/DisplayRequests';

export default function Main() {
  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>Item Request List</ContentInfoBox>
          <DisplayRequests />
        </div>
      </main>
    </div>
  );
}
