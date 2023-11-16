import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewArrivalsButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/new-arrivals')}
      type="button"
      className="buttons-box__new-arrivals"
    >
      <h1>Check out new arrivals</h1>
      <i className="fa-solid fa-fire" />
    </button>
  );
}
