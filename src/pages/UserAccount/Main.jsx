import React from 'react';
import AdPanel from '../../components/AdPanel';
// import ContentInfoBox from '../../components/ContentInfoBox';
import UserDetailBox from './component/UserDetailBox';
import ProductsTab from './component/ProductsTab';
// import DisplayProducts from './component/DisplayProducts';
// import PremiumAccountBox from './component/PremiumAccountBox';

export default function Main() {
  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <UserDetailBox />
          {/* <PremiumAccountBox /> */}
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <div className="main-section__mobile-div">
            <UserDetailBox />
            {/* <PremiumAccountBox /> */}
          </div>
          {/* <ContentInfoBox>All Posts</ContentInfoBox>
          <DisplayProducts /> */}
          <ProductsTab />
        </div>
      </main>
    </div>
  );
}
