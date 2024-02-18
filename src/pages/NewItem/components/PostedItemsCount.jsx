import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAuthState } from '../../../redux/slice/authSlice';

export default function PostedItemsCount() {
  const navigate = useNavigate();

  const {
    userInfo,
  } = useSelector(selectAuthState);

  const { isPremium, productsPosted } = userInfo;

  const itemsPosted = productsPosted;
  const barWidth = (itemsPosted / 3) * 100;

  if (isPremium) {
    return null;
  }

  return (
    <div className="new-item-form__posted-items-count">
      <h5 className="new-item-form__posted-items-count__text">{`${itemsPosted} Product Posted out of 3 free Products This Month`}</h5>
      <div className="new-item-form__posted-items-count__progress-bar-div">
        <div
          className="new-item-form__posted-items-count__progress-bar"
          style={{
            width: `${barWidth}%`,
          }}
        />
      </div>
      <button
        type="button"
        className="new-item-form__posted-items-count__upgrade-button"
        onClick={() => navigate('/create-shop')}
      >
        Upgrade To Shop
      </button>
    </div>
  );
}
