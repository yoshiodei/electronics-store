import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RequestItemCard({ request }) {
  const navigate = useNavigate();

  const {
    itemType, name, vendor, id,
  } = request;

  const handleClick = () => {
    navigate(`/single-request/${id}`);
  };

  return (
    <button
      type="button"
      className="request__item-card"
      onClick={handleClick}
    >
      <div className="request__item-card__icon-div">
        {itemType === 'vehicles' ? (<i className="request__item-card__icon fa-solid fa-car-side" />) : null}
        {itemType === 'electronics' ? (<i className="request__item-card__icon fa-solid fa-mobile-retro" />) : null}
      </div>
      <div className="request__item-card__info-div">
        <h5>{name}</h5>
        <h6>
          requested by
          {' '}
          {vendor.displayName}
        </h6>
      </div>
    </button>
  );
}
