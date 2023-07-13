import React from 'react';
import { useParams } from 'react-router-dom';
import AdPanel from '../../components/AdPanel';
import SectionHeader from '../../components/SectionHeader';
import CategoriesBox from '../SearchResult/components/CategoriesBox';
import SearchBar from '../SearchResult/components/SearchBar';
import DisplayCategoryProducts from './components/DisplayCategoryProducts';
import CategoryInfoBox from './components/CategoryInfoBox';
import CategoryFilterCard from './components/CategoryFilterCard';

export default function Main() {
  const { category } = useParams();
  console.log(category);

  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <SectionHeader>Filter</SectionHeader>
          <CategoryFilterCard category={category} />
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <CategoryInfoBox />
          <CategoriesBox />
          <SearchBar />
          <DisplayCategoryProducts />
        </div>
      </main>
    </div>
  );
}
