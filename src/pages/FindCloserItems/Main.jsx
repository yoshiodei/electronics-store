import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ContentInfoBox from '../../components/ContentInfoBox';
import AdPanel from '../../components/AdPanel';
import CategoriesBox from '../SearchResult/components/CategoriesBox';
import SearchBar from '../SearchResult/components/SearchBar';
import { setFilter } from '../../redux/slice/productsSlice';
import FilterCard from '../../components/FilterCard';
import MileRangeCard from '../../components/MileRangeCard';
import DisplayItemsNearMe from './components/DisplayItemsNearMe';
import { setItemMile } from '../../redux/slice/locationSlice';

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
    dispatch(setItemMile(5));
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      top.location.href = '#page-top';
    };

    scrollToTop();
  }, []);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <MileRangeCard />
          <FilterCard />
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ContentInfoBox>Find Items Close To Me</ContentInfoBox>
          <CategoriesBox />
          <SearchBar />
          <DisplayItemsNearMe />
        </div>
      </main>
    </div>
  );
}
