import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Uneditable() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBackToHome = () => {
    if (id) {
      navigate(`/single-item/${id}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="tabs-custom__empty-div">
      <i className="fa-solid fa-face-sad-tear" />
      <h2>Sorry, something went wrong.</h2>
      <button
        type="button"
        className="tabs-custom__button"
        onClick={handleBackToHome}
      >
        Go Back

      </button>
    </div>
  );
}
