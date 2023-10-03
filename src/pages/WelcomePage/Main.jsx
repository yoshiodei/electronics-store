import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DisplayCards from './components/DisplayCards';
import AdPanel from '../../components/AdPanel';
import SectionHeader from '../../components/SectionHeader';
import FilterCard from '../../components/FilterCard';
import CategoriesBox from '../../components/CategoriesBox';
import SearchCategoriesBox from '../SearchResult/components/CategoriesBox';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import useTopScroll from '../../Hooks/useTopScroll';
import { setFilter } from '../../redux/slice/productsSlice';
import HorizontalAdPanel from '../../components/HorizontalAdPanel';

export default function Main() {
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

  useTopScroll();

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
          <SearchBar />
          <SearchCategoriesBox />
          <Hero />
          <HorizontalAdPanel />
          <SectionHeader>All Products</SectionHeader>
          <DisplayCards />
        </div>
      </main>
    </div>
  );
}
