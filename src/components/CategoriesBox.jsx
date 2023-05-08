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
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-mobile me-2" />
              <p>Phones</p>
            </div>
            <i className="categories-box__list-item-icon fa-solid fa-chevron-right" />
          </Link>
        </li>
        <li className="categories-box__list-item categories-box__list-item">
          <Link to="/search">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-tv me-2" />
              <p>Televisions</p>
            </div>
            <i className="categories-box__list-item-icon fa-solid fa-chevron-right" />
          </Link>
        </li>
        <li className="categories-box__list-item">
          <Link to="/search">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-desktop me-2" />
              <p>Desktops</p>
            </div>
            <i className="categories-box__list-item-icon fa-solid fa-chevron-right" />
          </Link>
        </li>
        <li className="categories-box__list-item">
          <Link to="/search">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-laptop me-2" />
              <p>Laptops</p>
            </div>
            <i className="categories-box__list-item-icon fa-solid fa-chevron-right" />
          </Link>
        </li>
        <li className="categories-box__list-item">
          <Link to="/search">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-gamepad me-2" />
              <p>Game Consoles</p>
            </div>
            <i className="categories-box__list-item-icon fa-solid fa-chevron-right" />
          </Link>
        </li>
        <li className="categories-box__list-item">
          <Link to="/search">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-headphones me-2" />
              <p>Headphones & Speakers</p>
            </div>
            <i className="categories-box__list-item-icon fa-solid fa-chevron-right" />
          </Link>
        </li>
        <li className="categories-box__list-item">
          <Link to="/search">
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-puzzle-piece me-2" />
              <p>Accessories</p>
            </div>
            <i className="categories-box__list-item-icon fa-solid fa-chevron-right" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
