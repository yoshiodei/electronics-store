import React from 'react';
import AdPanel from '../../components/AdPanel';
import FilterCard from '../../components/FilterCard';
// import Pagination from '../../components/Pagination';
import SectionHeader from '../../components/SectionHeader';
import SearchBar from './components/SearchBar';
import SearchInfoBox from './components/SearchInfoBox';
import CategoriesBox from './components/CategoriesBox';
import DisplaySearchItems from './components/DisplaySearchItems';

export default function Main() {
  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <SectionHeader>Filter</SectionHeader>
          <FilterCard />
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <SearchInfoBox />
          <CategoriesBox />
          <SearchBar />
          <DisplaySearchItems />
          {/* <Pagination /> */}
        </div>
      </main>
    </div>
  );
}
