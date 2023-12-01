import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewArrivals() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/new-arrivals')}
      type="button"
      className="welcome-page__hero__new-arrivals-button shiny"
    >
      <h2>Explore New Arrivals Now!</h2>
      <i className="fa-solid fa-fire" />
    </button>
  );
}
