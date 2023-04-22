import React from 'react';
import { Link } from 'react-router-dom';
import SellNowButton from './SellNowButton';

export default function Navbar() {
  return (
    <nav className="navbar-custom">
      <div className="navbar-custom__top-div">
        <ul className="d-flex justify-content-end align-items-center">
          <li>
            <Link to="/notifications">notifications</Link>
          </li>
          <li>
            <Link to="/user-account">my account</Link>
          </li>
          <li>
            <Link to="/user-account">sign in</Link>
          </li>
        </ul>
      </div>
      <div className="d-flex justify-content-between navbar-custom__bottom-div align-items-center">
        <Link to="/" className="h2 navbar-custom__brand">Brand</Link>
        <SellNowButton />
      </div>
    </nav>
  );
}
