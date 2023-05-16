import React from 'react';
import { Link } from 'react-router-dom';

export default function SellNowButton() {
  return (
    <>
      { false
        && (
        <Link to="/new-item" className="sell-now">
          <h6>Sell Now</h6>
        </Link>
        )}
      <button type="button" className="btn btn-primary sell-now">
        Sell Now
      </button>
    </>
  );
}
