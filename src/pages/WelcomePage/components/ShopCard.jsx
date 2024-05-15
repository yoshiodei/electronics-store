import React from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../../assets/images/profile.jpg';

export default function ShopCard({ store }) {
  const {
    firstName, uid, photoURL,
  } = store;

  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="welcome-page__shop-card"
      key={uid}
      onClick={() => navigate(`/user-account/${uid}`)}
    >
      <div className="welcome-page__shop-card__image-div">
        <img src={photoURL || profile} className="welcome-page__shop-card__image" alt="shop logo" />
      </div>
      <h6 className="welcome-page__shop-card__shop-name">{firstName}</h6>
    </button>
  );
}
