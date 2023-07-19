import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdPanel from '../components/AdPanel';
import CategoriesBox from '../components/CategoriesBox';
import SearchCategoriesBox from '../pages/SearchResult/components/CategoriesBox';
import FilterCard from '../components/FilterCard';
import Hero from '../components/Hero';
import SectionHeader from '../components/SectionHeader';
import DisplayCards from '../pages/Home/components/DisplayCards';
import { setFilter } from '../redux/slice/productsSlice';

export default function HomeMain() {
  const dispatch = useDispatch();

  const initialFilter = {
    maxPrice: 10000,
    minPrice: 0,
    location: 'all',
    brand: 'all',
    category: 'all',
    condition: 'all',
  };

  useEffect(() => () => {
    dispatch(setFilter(initialFilter));
  }, []);

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
          <SearchCategoriesBox />
          <SectionHeader>Popular Products</SectionHeader>
          <DisplayCards />
        </div>
      </main>
    </div>
  );
}
