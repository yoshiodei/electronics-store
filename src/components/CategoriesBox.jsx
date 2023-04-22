import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoriesBox() {
  return (
    <div className="categories-box">
      <div className="categories-box__title-div d-flex align-items-center">
        <div className="categories-box__lines-div d-flex flex-column justify-content-between">
          <div className="categories-box__lines" />
          <div className="categories-box__lines" />
          <div className="categories-box__lines" />
        </div>
        <h6 className="categories-box__title">Categories</h6>
      </div>
      <ul className="categories-box__list d-flex flex-column justify-content-between">
        <li className="categories-box__list-item">
          <Link to="/search">
            <p>Phones</p>
            <i className="categories-box__list-item-icon fa-solid fa-chevron-right" />
          </Link>
        </li>
        <li className="categories-box__list-item categories-box__list-item">
          <Link to="/search">
            <p>Televisions</p>
            <i className="categories-box__list-item-icon fa-solid fa-chevron-right" />
          </Link>
        </li>
        <li className="categories-box__list-item">
          <Link to="/search">
            <p>Desktops</p>
            <i className="categories-box__list-item-icon fa-solid fa-chevron-right" />
          </Link>
        </li>
        <li className="categories-box__list-item">
          <Link to="/search">
            <p>Laptops</p>
            <i className="categories-box__list-item-icon fa-solid fa-chevron-right" />
          </Link>
        </li>
        <li className="categories-box__list-item">
          <Link to="/search">
            <p>Game Consoles</p>
            <i className="categories-box__list-item-icon fa-solid fa-chevron-right" />
          </Link>
        </li>
        <li className="categories-box__list-item">
          <Link to="/search">
            <p>Headphones & Speakers</p>
            <i className="categories-box__list-item-icon fa-solid fa-chevron-right" />
          </Link>
        </li>
        <li className="categories-box__list-item">
          <Link to="/search">
            <p>Accessories</p>
            <i className="categories-box__list-item-icon fa-solid fa-chevron-right" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
