import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Uneditable() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="tabs-custom__empty-div">
      <i className="fa-solid fa-face-sad-tear" />
      <h2>Sorry, item selected cannot be edited.</h2>
      <button
        type="button"
        className="tabs-custom__button"
        onClick={handleBackToHome}
      >
        Go Back To Home

      </button>
    </div>
  );
}
