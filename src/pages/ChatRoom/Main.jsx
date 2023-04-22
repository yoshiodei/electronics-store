import React from 'react';
import AdPanel from '../../components/AdPanel';
import ChatWall from './components/ChatWall';
import VendorProfile from './components/VendorProfile';

export default function Main() {
  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <VendorProfile />
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ChatWall />
        </div>
      </main>
    </div>
  );
}
