import React, { useEffect, useState } from 'react';
import DisplayCards from './components/DisplayCards';
import AdPanel from '../../components/AdPanel';
import SectionHeader from '../../components/SectionHeader';
import FilterCard from '../../components/FilterCard';
import CategoriesBox from '../../components/CategoriesBox';
import SearchCategoriesBox from '../SearchResult/components/CategoriesBox';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import FilterByDistance from './components/FilterByDistance';
// import { useDispatch } from 'react-redux';
// import AdPanel from '../components/AdPanel';
// import CategoriesBox from '../components/CategoriesBox';
// import SearchCategoriesBox from '../pages/SearchResult/components/CategoriesBox';
// import FilterCard from '../components/FilterCard';
// import Hero from '../components/Hero';
// import SectionHeader from '../components/SectionHeader';
// import DisplayCards from '../pages/Home/components/DisplayCards';
// import { setFilter } from '../redux/slice/productsSlice';
// import FindCloserItemsButton from '../components/FindCloserItemsButton';

export default function Main() {
//   const dispatch = useDispatch();

  //   const initialFilter = {
  //     maxPrice: 10000,
  //     minPrice: 0,
  //     location: 'all',
  //     brand: 'all',
  //     category: 'all',
  //     condition: 'all',
  //   };

  //   useEffect(() => () => {
  //     dispatch(setFilter(initialFilter));
  //   }, []);

  useEffect(() => {
    const scrollToTop = () => {
      top.location.href = '#page-top';
    };

    scrollToTop();
  }, []);

  const [miles, setMiles] = useState(70);

  return (
    <div className="main-section-div">
      <SearchBar />
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <CategoriesBox />
          <SectionHeader>Filter</SectionHeader>
          <FilterCard />
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          {/* <Hero />
          <SearchCategoriesBox />
          <div className="main-section__mobile-div">
            <FindCloserItemsButton />
          </div>
          <SectionHeader>Popular Products</SectionHeader>
          <DisplayCards /> */}
          <SearchCategoriesBox />
          <Hero />
          <SectionHeader>All Products</SectionHeader>
          <FilterByDistance setMiles={setMiles} miles={miles} />
          <DisplayCards miles={miles} />
        </div>
      </main>
    </div>
  );
}
