import React from 'react';
import ProductCard from '../../../components/ProductCard';
import SectionHeader from '../../../components/SectionHeader';

export default function SimilarItems() {
  return (
    <div>
      <SectionHeader>Similar Items</SectionHeader>
      <div className="row">
        <div className="col-md-3">
          <ProductCard />
        </div>
        <div className="col-md-3">
          <ProductCard />
        </div>
        <div className="col-md-3">
          <ProductCard />
        </div>
        <div className="col-md-3">
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
