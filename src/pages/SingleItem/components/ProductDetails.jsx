import React from 'react';

export default function ProductDetail() {
  return (
    <div className="product-detail">
      <div className="product-detail__product-name-div">
        <h6 className="product-detail__title">Product</h6>
        <h3 className="product-detail__name">iPhone 11 Pro Max, 256 GB, Gold</h3>
      </div>
      <div className="product-detail__product-price-div">
        <h6 className="product-detail__title">Price</h6>
        <h3 className="product-detail__price">$ 6,800.00</h3>
      </div>
      <div className="product-detail__product-condition-div">
        <h6 className="product-detail__title">Item Condition</h6>
        <h3 className="product-detail__condition">Slightly Used</h3>
      </div>
      <div className="product-detail__product-details-div">
        <h6 className="product-detail__title">Details</h6>
        <p className="product-detail__detail">
          Lorem ipsum imei larei kamal ini salaam mun
          halni dolor. Malai kalor larei funki hain toloi maila.
        </p>
      </div>
    </div>
  );
}
