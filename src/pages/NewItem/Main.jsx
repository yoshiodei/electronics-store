import React from 'react';
import AdPanel from '../../components/AdPanel';
import ContentInfoBox from '../../components/ContentInfoBox';
import FormItems from './components/FormItems';
import PostedItemsCount from './components/PostedItemsCount';

export default function Main() {
  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <PostedItemsCount />
          <ContentInfoBox>Post New Item</ContentInfoBox>
          <FormItems />
        </div>
      </main>
    </div>
  );
}
