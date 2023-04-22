import React from 'react';
import { Link } from 'react-router-dom';

export default function SellNowButton() {
  // const buttonClicked = () => {
  // }
  return (
    <Link to="/new-item" className="sell-now">
      <h6>Sell Now</h6>
    </Link>
  );
}
