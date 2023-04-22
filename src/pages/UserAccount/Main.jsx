import React from 'react';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';
import UserDetailBox from './component/UserDetailBox';
import DisplayProductCard from '../../components/DisplayProductCard';

export default function Main() {
  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <UserDetailBox />
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>All Posts</ContentInfoBox>
          <DisplayProductCard />
        </div>
      </main>
    </div>
  );
}
