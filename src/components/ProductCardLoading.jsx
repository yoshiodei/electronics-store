import React from 'react';

export default function ProductCardLoading() {
  return (
    <div className="product-card-loading">
      <div className="product-card-loading__image loading" />
      <div className="product-card-loading__price loading" />
      <div className="product-card-loading__text-div">
        <div className="loading" />
        <div className="loading" />
      </div>
      <div className="product-card-loading__location loading" />
      <div className="product-card-loading__condition loading" />
    </div>
  );
}
