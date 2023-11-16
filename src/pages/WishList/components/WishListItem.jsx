import React from 'react';
import { Link } from 'react-router-dom';

export default function WishListItem({ item, removeItem }) {
  const {
    name, price, location, condition, id, image,
  } = item;

  const handleCloseItem = () => {
    removeItem(id);
  };

  return (
    <div className="wish-list__item" key={id}>
      <Link to={`/single-item/${id}`}>
        <div className="wish-list__image-div">
          <img src={image || ''} alt="..." />
        </div>
        <div className="wish-list__info-div">
          <h6>{name}</h6>
          <h6>{`$ ${price}.00`}</h6>
          <h6>{(location?.state && location?.town) ? `${location?.town}, ${location?.state}` : 'location is unknown'}</h6>
          <h6>{condition}</h6>
        </div>
      </Link>
      <div className="wish-list__button-div">
        <button type="button" onClick={() => handleCloseItem()}>X</button>
      </div>
    </div>
  );
}
