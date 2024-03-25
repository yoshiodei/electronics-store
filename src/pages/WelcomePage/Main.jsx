import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DisplayCards from './components/DisplayCards';
import SectionHeader from '../../components/SectionHeader';
// import AdPanel from '../../components/AdPanel';
import FilterCard from '../../components/FilterCard';
// import CategoriesBox from '../../components/CategoriesBox';
import SearchCategoriesBox from '../SearchResult/components/CategoriesBox';
// import SearchBar from './components/SearchBar';
// import useTopScroll from '../../Hooks/useTopScroll';
import { setFilter } from '../../redux/slice/productsSlice';
// import HorizontalAdPanel from '../../components/HorizontalAdPanel';
// import SellNowButtonBoxMobile from '../WishList/components/SellNowButtonBoxMobile';
// import Hero from './components/Hero';
import TopBrands from './components/TopBrands';
import ExploreShops from './components/ExploreShops';
import { selectItemTypeState, setItemType } from '../../redux/slice/itemTypeSlice';
import ItemTypeToggleButton from './components/ItemTypeToggleButton';

export default function Main() {
  const dispatch = useDispatch();
  const { itemType } = useSelector(selectItemTypeState);

  const initialFilter = {
    maxPrice: 10000,
    minPrice: 0,
    location: 'all',
    brand: 'all',
    category: 'all',
    condition: 'all',
  };

  useEffect(() => () => {
    dispatch(setItemType('electronics'));
    dispatch(setFilter(initialFilter));
    window.scrollTo(0, 0);
  }, []);

  // useTopScroll();

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          {/* <CategoriesBox /> */}
          {/* <NewArrivalsButton /> */}
          <ItemTypeToggleButton />
          <SectionHeader>Filter</SectionHeader>
          <FilterCard itemType={itemType} />
          {/* <AdPanel /> */}
        </div>
        <div className="main-section__right-div welcome-page__right-div">
          <div className="main-section__mobile-div">
            <ItemTypeToggleButton />
          </div>
          {/* <SellNowButtonBoxMobile /> */}
          <SearchCategoriesBox itemType={itemType} />
          <ExploreShops />
          {/* <Hero /> */}
          {/* <HorizontalAdPanel /> */}
          <div className="main-section__mobile-div">
            {/* <SearchBar /> */}
            {/* <NewArrivalsButton /> */}
          </div>
        </div>
      </main>
      <main className="main-section">
        <div>
          <SectionHeader>Top Brands</SectionHeader>
          <TopBrands itemType={itemType} />
        </div>
        <div>
          <SectionHeader>All Products</SectionHeader>
          <DisplayCards itemType={itemType} />
        </div>
      </main>
    </div>
  );
}
