import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BuyerRequests() {
  const navigate = useNavigate();

  return (
    <div className="request__section">
      <h6 className="request__section__text">
        Check out what users are looking to buy.
      </h6>
      <button
        className="request__section__button"
        type="button"
        onClick={() => navigate('/request-item-list')}
      >
        View Requests
      </button>
    </div>
  );
}
