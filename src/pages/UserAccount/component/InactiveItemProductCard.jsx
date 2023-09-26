import React from 'react';

export default function InactiveItemProductCard({ product, sold, pending }) {
  const {
    id, price, name, brand, condition, images,
  } = product;

  const image = images[0];

  return (
    <div className="product-card" key={id}>
      <div className="product-card__link">
        <div className="product-card__image-div">
          <img src={image || ''} alt="product" className="product-card__image" />
        </div>
        <h5 className="product-card__product-price">{`$ ${price}`}</h5>
        <p className="product-card__product-name">{name}</p>
        <div className="product-card__product-location-div d-flex align-items-center">
          <p className="product-card__product-location-name">{brand}</p>
        </div>
        <div className="product-card__product-condition-div">
          <p className="product-card__product-condition">{condition}</p>
        </div>
        { true && (
        <div className="product-card__promotion-div">
          {pending && (<p className="product-card__promotion product-card__promotion--pending">pending</p>)}
          {sold && (<p className="product-card__promotion product-card__promotion--sold">sold</p>)}
        </div>
        )}
      </div>
    </div>
  );
}
