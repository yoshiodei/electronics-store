import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const {
    id, price, name, location, condition, isPromoted, image,
  } = product;

  return (
    <div className="product-card" key={id}>
      <Link to={`/single-item/${id}`} className="product-card__link">
        <div className="product-card__image-div">
          <img src={image} alt="product" className="product-card__image" />
        </div>
        <h5 className="product-card__product-price">{`$ ${price}`}</h5>
        <p className="product-card__product-name">{name}</p>
        <div className="product-card__product-location-div d-flex align-items-center">
          <i className="product-card__product-location-icon fa-solid fa-location-dot" />
          <p className="product-card__product-location-name">
            {location}
          </p>
        </div>
        <div className="product-card__product-condition-div">
          <p className="product-card__product-condition">{condition}</p>
        </div>
        { isPromoted && (
        <div className="product-card__promotion-div">
          <p className="product-card__promotion">promoted</p>
        </div>
        )}
      </Link>
      <div className="product-card__add-to-wish-list d-flex">
        <i className="fa-sharp fa-regular fa-heart product-card__add-to-wish-list__icon" />
      </div>
    </div>
  );
}
