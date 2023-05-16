import React from 'react';
import AdPanel from '../../components/AdPanel';
import FilterCard from '../../components/FilterCard';
import SectionHeader from '../../components/SectionHeader';
// import SearchInfoBox from '../SearchResult/components/SearchInfoBox';
import CategoriesBox from '../SearchResult/components/CategoriesBox';
import SearchBar from '../SearchResult/components/SearchBar';
import Pagination from '../../components/Pagination';
import DispalyCategoryProducts from './components/DispalyCategoryProducts';
import CategoryInfoBox from './components/CategoryInfoBox';

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
          <CategoryInfoBox />
          <CategoriesBox />
          <SearchBar />
          <DispalyCategoryProducts />
          <Pagination />
        </div>
      </main>
    </div>
  );
}
