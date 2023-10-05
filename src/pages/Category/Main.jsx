import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdPanel from '../../components/AdPanel';
import SectionHeader from '../../components/SectionHeader';
import SearchBar from '../SearchResult/components/SearchBar';
import CategoriesBox from '../SearchResult/components/CategoriesBox';
import DisplayCategoryProducts from './components/DisplayCategoryProducts';
import CategoryInfoBox from './components/CategoryInfoBox';
import CategoryFilterCard from './components/CategoryFilterCard';
import { setCategoryFilter } from '../../redux/slice/productsSlice';
import SellNowButtonBoxMobile from '../WishList/components/SellNowButtonBoxMobile';

export default function Main() {
  const { category } = useParams();
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
    dispatch(setCategoryFilter(initialFilter));
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      top.location.href = '#page-top';
    };

    scrollToTop();
  }, [category]);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <SectionHeader>Filter</SectionHeader>
          <CategoryFilterCard category={category} />
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <SellNowButtonBoxMobile />
          <CategoryInfoBox />
          <CategoriesBox />
          <SearchBar />
          <DisplayCategoryProducts />
        </div>
      </main>
    </div>
  );
}
