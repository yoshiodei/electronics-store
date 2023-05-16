import React from 'react';
import ProductCardLoading from '../../../components/ProductCardLoading';

export default function DisplayProductLoader() {
  return (
    <div className="row g-2">
      <div className="col-6 col-md-3">
        <ProductCardLoading />
      </div>
      <div className="col-6 col-md-3">
        <ProductCardLoading />
      </div>
      <div className="col-6 col-md-3">
        <ProductCardLoading />
      </div>
      <div className="col-6 col-md-3">
        <ProductCardLoading />
      </div>
      <div className="col-6 col-md-3">
        <ProductCardLoading />
      </div>
      <div className="col-6 col-md-3">
        <ProductCardLoading />
      </div>
      <div className="col-6 col-md-3">
        <ProductCardLoading />
      </div>
      <div className="col-6 col-md-3">
        <ProductCardLoading />
      </div>
    </div>
  );
}
