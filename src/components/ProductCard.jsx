import React from 'react';

export default function ProductCard() {
  return (
    <div className="product-card">
      <div className="product-card__image-div" />
      <h5 className="product-card__product-price">$ 540.00</h5>
      <p className="product-card__product-name">iPhone 11 Pro 128 GB, Space Grey</p>
      <div className="product-card__product-location-div d-flex align-items-center">
        {/* <i className="product-card__product-location-icon" /> */}
        <i className="product-card__product-location-icon fa-solid fa-location-dot" />
        <p className="product-card__product-location-name">
          Auston, Texas
        </p>
      </div>
      <div className="product-card__product-condition-div">
        <p className="product-card__product-condition">Brand New</p>
      </div>
      <div className="product-card__promotion-div">
        <p className="product-card__promotion">promoted</p>
      </div>
    </div>
  );
}
