import React from 'react';
// import SectionHeader from '../../components/SectionHeader';
import AdPanel from '../../components/AdPanel';
import SearchBar from '../SearchResult/components/SearchBar';
import CategoriesBox from '../SearchResult/components/CategoriesBox';
import SellNowButtonBoxMobile from '../WishList/components/SellNowButtonBoxMobile';
import NewArrivalsHeader from './components/NewArrivalsHeader';
import DisplayNewArrivals from './components/DisplayNewArrivals';

export default function Main() {
  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          {/* <SectionHeader>Filter</SectionHeader> */}
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <SellNowButtonBoxMobile />
          <NewArrivalsHeader />
          <CategoriesBox />
          <SearchBar />
          <DisplayNewArrivals />
        </div>
      </main>
    </div>
  );
}
