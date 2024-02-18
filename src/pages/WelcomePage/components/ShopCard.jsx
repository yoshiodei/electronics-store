import React from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../../../assets/images/profile.jpg';

export default function ShopCard({ store }) {
  const {
    firstName, uid, photoURL, bio,
  } = store;

  const navigate = useNavigate();

  return (
    <div className="welcome-page__shop-card" key={uid}>
      <div className="welcome-page__shop-card__image-div">
        <img src={photoURL || profile} className="welcome-page__shop-card__image" alt="shop logo" />
      </div>
      <h6 className="welcome-page__shop-card__shop-name">{firstName}</h6>
      <p className="welcome-page__shop-card__shop-description">{bio}</p>
      <button
        className="welcome-page__shop-card__button"
        type="button"
        onClick={() => navigate(`/user-account/${uid}`)}
      >
        View Shop
      </button>
    </div>
  );
}
