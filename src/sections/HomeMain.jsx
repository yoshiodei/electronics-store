import React from 'react';
import AdPanel from '../components/AdPanel';
import CategoriesBox from '../components/CategoriesBox';
import FilterCard from '../components/FilterCard';
import Hero from '../components/Hero';
import Pagination from '../components/Pagination';
import ProductCard from '../components/ProductCard';
import SectionHeader from '../components/SectionHeader';

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
          <Hero />
          <SectionHeader>Popular Products</SectionHeader>
          <div className="row g-2">
            <div className="col-6 col-md-3">
              <ProductCard />
            </div>
            <div className="col-6 col-md-3">
              <ProductCard />
            </div>
            <div className="col-6 col-md-3">
              <ProductCard />
            </div>
            <div className="col-6 col-md-3">
              <ProductCard />
            </div>
            <div className="col-6 col-md-3">
              <ProductCard />
            </div>
            <div className="col-6 col-md-3">
              <ProductCard />
            </div>
            <div className="col-6 col-md-3">
              <ProductCard />
            </div>
          </div>
          <Pagination />
        </div>
      </main>
    </div>
  );
}
