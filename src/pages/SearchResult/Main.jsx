import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AdPanel from '../../components/AdPanel';
import FilterCard from '../../components/FilterCard';
import SectionHeader from '../../components/SectionHeader';
import SearchBar from './components/SearchBar';
import SearchInfoBox from './components/SearchInfoBox';
import CategoriesBox from './components/CategoriesBox';
import DisplaySearchItems from './components/DisplaySearchItems';
import { setFilter } from '../../redux/slice/productsSlice';

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
        </div>
      </main>
    </div>
  );
}
