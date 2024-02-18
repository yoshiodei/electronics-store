import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import AdPanel from '../../components/AdPanel';

// import SearchBar from '../SearchResult/components/SearchBar';
import DisplayCategoryProducts from '../Category/components/DisplayCategoryProducts';
import CategoryInfoBox from '../Category/components/CategoryInfoBox';
import { setCategoryFilter } from '../../redux/slice/productsSlice';
import SellNowButtonBoxMobile from '../WishList/components/SellNowButtonBoxMobile';
import HeroSectionCarBrands from './components/HeroSectionCarBrands';
import CarsCategoriesBox from './components/CarsCategoriesBox';
import SectionHeader from '../../components/SectionHeader';
import CarCategoryFilterCard from './components/CarCategoryFilterCard';

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
  }, [category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <SectionHeader>Filter</SectionHeader>
          <CarCategoryFilterCard category={category} />
          {/* <AdPanel /> */}
        </div>
        <div className="main-section__right-div main-section__right-div__category-alt">
          <SellNowButtonBoxMobile />
          <CategoryInfoBox />
          <CarsCategoriesBox />
          {/* <SearchBar /> */}
          <SectionHeader>Top Brands</SectionHeader>
          <HeroSectionCarBrands />
        </div>
      </main>
      <main className="main-section">
        <div>
          <SectionHeader>{`All ${category}`}</SectionHeader>
          <DisplayCategoryProducts />
        </div>
      </main>
    </div>
  );
}
