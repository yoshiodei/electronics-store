import React from 'react';

export default function ProductLocation() {
  return (
    <div className="product-location">
      <div className="product-location__location-name-div">
        <h6 className="product-location__title">Location</h6>
        <h3 className="product-location__name">Auston, Texas</h3>
      </div>
      <div className="product-location__product-distance-div">
        <h6 className="product-location__title">Item Distance</h6>
        <h3 className="product-location__distance">
          <span>3.2 </span>
          miles away
        </h3>
      </div>
    </div>
  );
}
