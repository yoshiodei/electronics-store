import React from 'react';
import AdPanel from '../components/AdPanel';
import CategoriesBox from '../components/CategoriesBox';
import SearchCategoriesBox from '../pages/SearchResult/components/CategoriesBox';
import FilterCard from '../components/FilterCard';
import Hero from '../components/Hero';
import Pagination from '../components/Pagination';
import SectionHeader from '../components/SectionHeader';
import DisplayProductCards from '../pages/Home/components/DisplayProductCards';

export default function HomeMain() {
  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <CategoriesBox />
          <SectionHeader>Filter</SectionHeader>
          <FilterCard />
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <SearchCategoriesBox />
          <Hero />
          <SectionHeader>Popular Products</SectionHeader>
          <DisplayProductCards />
          <Pagination />
        </div>
      </main>
    </div>
  );
}
