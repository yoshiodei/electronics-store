import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FindCloserItemsButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="find-closer-items__button"
      onClick={() => navigate('/find-closer-items')}
    >
      <div className="find-closer-items__icon-div">
        <i className="fa-solid fa-location-crosshairs" />
      </div>
      <h6>Find Items Near Me</h6>
      <i className="fa-solid fa-chevron-right" />
    </button>
  );
}
