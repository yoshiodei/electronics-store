import React from 'react';
import AdPanel from '../../components/AdPanel';
import ItemImageBox from './components/ItemImageBox';
import ProductDetail from './components/ProductDetails';
import ProductLocation from './components/ProductLocation';
import SimilarItems from './components/SimilarItems';
import VendorDetails from './components/VendorDetails';
import ButtonsBox from './components/ButtonsBox';

export default function Main() {
  return (
    <div className="main-section-div">
      <main className="main-section d-flex justify-content-between">
        <div className="main-section__left-div">
          <ProductDetail />
          <ProductLocation />
          <VendorDetails />
          <ButtonsBox />
          <AdPanel />
        </div>
        <div className="main-section__right-div">
          <ItemImageBox />
          <div className="main-section__mobile-div">
            <ProductDetail />
            <ProductLocation />
            <VendorDetails />
            <ButtonsBox />
          </div>
          <SimilarItems />
        </div>
      </main>
    </div>
  );
}
