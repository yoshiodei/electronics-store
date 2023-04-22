import React from 'react';
import SellNowButton from './SellNowButton';

export default function Navbar() {
  return (
    <nav className="navbar-custom">
      <div className="navbar-custom__top-div">
        <ul className="d-flex justify-content-end align-items-center">
          <li>notifications</li>
          <li>my account</li>
          <li>sign in</li>
        </ul>
      </div>
      <div className="d-flex justify-content-between navbar-custom__bottom-div align-items-center">
        <h1 className="h2 navbar-custom__brand">Brand</h1>
        <SellNowButton />
      </div>
    </nav>
  );
}
