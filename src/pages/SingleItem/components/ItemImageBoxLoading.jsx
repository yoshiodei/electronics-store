import React from 'react';

export default function ItemImageBoxLoading() {
  return (
    <div className="item-image-box-loading">
      <div className="item-image-box-loading__top-div">
        <div className="loading" />
      </div>
      <div className="item-image-box-loading__bottom-div">
        <div className="loading" />
        <div className="loading" />
        <div className="loading" />
        <div className="loading" />
        <div className="loading" />
      </div>
    </div>
  );
}
