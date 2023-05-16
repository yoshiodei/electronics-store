import React from 'react';

export default function VendorDetailLoading() {
  return (
    <div className="product-detail-loading">
      <div className="product-detail-loading__inner-div product-detail-loading__inner-div--alt">
        <div className="product-detail-loading__vendor-image loading" />
        <div className="product-detail-loading__vendor-info-div">
          <div className="product-detail-loading__Loader-top loading" />
          <div className="product-detail-loading__Loader-bottom loading" />
        </div>
      </div>
    </div>
  );
}
