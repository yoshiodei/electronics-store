import React from 'react';
import ProductCard from '../../../components/ProductCard';
import SectionHeader from '../../../components/SectionHeader';

export default function SimilarItems() {
  return (
    <div>
      <SectionHeader>Similar Items</SectionHeader>
      <div className="row g-2">
        <div className="col-6 col-md-3">
          <ProductCard />
        </div>
        <div className="col-6 col-md-3">
          <ProductCard />
        </div>
        <div className="col-6 col-md-3">
          <ProductCard />
        </div>
        <div className="col-6 col-md-3">
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
