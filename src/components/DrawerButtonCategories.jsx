import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItemTypeState } from '../redux/slice/itemTypeSlice';

export default function DrawerButtonCategories({ setToggleDrawer }) {
  const { itemType } = useSelector(selectItemTypeState);
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase()}`);
    setToggleDrawer(false);
  };

  const handleCarCategoryClick = (category) => {
    navigate(`/category/cars/${category.toLowerCase()}`);
    setToggleDrawer(false);
  };

  if (itemType === 'cars') {
    return (
      <ul>
        <li className="drawer-button__menu-item">
          <button type="button" onClick={() => handleCarCategoryClick('motorcycles')}>
            <div className="drawer-button__menu-item__button-div">
              <i className="fa-solid fa-motorcycle" />
              <h6>Motorcycles</h6>
            </div>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </li>
        <li className="drawer-button__menu-item">
          <button type="button" onClick={() => handleCarCategoryClick('cars & trucks')}>
            <div className="drawer-button__menu-item__button-div">
              <i className="fa-solid fa-car-side" />
              <h6>Cars & Trucks</h6>
            </div>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </li>
        <li className="drawer-button__menu-item">
          <button type="button" onClick={() => handleCarCategoryClick('campers & rvs')}>
            <div className="drawer-button__menu-item__button-div">
              <i className="fa-solid fa-truck" />
              <h6>Campers & RVs</h6>
            </div>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </li>
        <li className="drawer-button__menu-item">
          <button type="button" onClick={() => handleCarCategoryClick('boats & marine')}>
            <div className="drawer-button__menu-item__button-div">
              <i className="fa-solid fa-ship" />
              <h6>Boats & Marine</h6>
            </div>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </li>
        <li className="drawer-button__menu-item">
          <button type="button" onClick={() => handleCarCategoryClick('powersport vehicles')}>
            <div className="drawer-button__menu-item__button-div">
              <i className="fa-solid fa-truck-monster" />
              <h6>Powersport Vehicles</h6>
            </div>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </li>
        <li className="drawer-button__menu-item">
          <button type="button" onClick={() => handleCarCategoryClick('trailer')}>
            <div className="drawer-button__menu-item__button-div">
              <i className="fa-solid fa-trailer" />
              <h6>Trailers</h6>
            </div>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </li>
        <li className="drawer-button__menu-item">
          <button type="button" onClick={() => handleCarCategoryClick('tires & rims')}>
            <div className="drawer-button__menu-item__button-div">
              <i className="fa-solid fa-dharmachakra" />
              <h6>Tires & Rims</h6>
            </div>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </li>
        <li className="drawer-button__menu-item">
          <button type="button" onClick={() => handleCarCategoryClick('auto parts & accessories')}>
            <div className="drawer-button__menu-item__button-div">
              <i className="fa-solid fa-screwdriver-wrench" />
              <h6>Auto Parts & Accessories</h6>
            </div>
            <i className="fa-solid fa-chevron-right" />
          </button>
        </li>
      </ul>
    );
  }

  return (
    <ul>
      <li className="drawer-button__menu-item">
        <button type="button" onClick={() => handleCategoryClick('phones')}>
          <div className="drawer-button__menu-item__button-div">
            <i className="fa-solid fa-mobile" />
            <h6>Cellphones & Accessories</h6>
          </div>
          <i className="fa-solid fa-chevron-right" />
        </button>
      </li>
      <li className="drawer-button__menu-item">
        <button type="button" onClick={() => handleCategoryClick('Televisions')}>
          <div className="drawer-button__menu-item__button-div">
            <i className="fa-solid fa-tv" />
            <h6>Televisions</h6>
          </div>
          <i className="fa-solid fa-chevron-right" />
        </button>
      </li>
      <li className="drawer-button__menu-item">
        <button type="button" onClick={() => handleCategoryClick('Computers & Tablets')}>
          <div className="drawer-button__menu-item__button-div">
            <i className="fa-solid fa-desktop" />
            <h6>Computers & Tablets</h6>
          </div>
          <i className="fa-solid fa-chevron-right" />
        </button>
      </li>
      <li className="drawer-button__menu-item">
        <button type="button" onClick={() => handleCategoryClick('Office Electronics')}>
          <div className="drawer-button__menu-item__button-div">
            <i className="fa-solid fa-print" />
            <h6>Office Electronics</h6>
          </div>
          <i className="fa-solid fa-chevron-right" />
        </button>
      </li>
      <li className="drawer-button__menu-item">
        <button type="button" onClick={() => handleCategoryClick('Video Games & Consoles')}>
          <div className="drawer-button__menu-item__button-div">
            <i className="fa-solid fa-gamepad" />
            <h6>Video Games & Consoles</h6>
          </div>
          <i className="fa-solid fa-chevron-right" />
        </button>
      </li>
      <li className="drawer-button__menu-item">
        <button type="button" onClick={() => handleCategoryClick('Audio & Headphones')}>
          <div className="drawer-button__menu-item__button-div">
            <i className="fa-solid fa-headphones" />
            <h6>Audio & Headphones</h6>
          </div>
          <i className="fa-solid fa-chevron-right" />
        </button>
      </li>
      <li className="drawer-button__menu-item">
        <button type="button" onClick={() => handleCategoryClick('Home Appliances')}>
          <div className="drawer-button__menu-item__button-div">
            <i className="fa-solid fa-house" />
            <h6>Home Appliances</h6>
          </div>
          <i className="fa-solid fa-chevron-right" />
        </button>
      </li>
      <li className="drawer-button__menu-item">
        <button type="button" onClick={() => handleCategoryClick('Car Electronics')}>
          <div className="drawer-button__menu-item__button-div">
            <i className="fa-solid fa-car" />
            <h6>Car Electronics</h6>
          </div>
          <i className="fa-solid fa-chevron-right" />
        </button>
      </li>
      <li className="drawer-button__menu-item">
        <button type="button" onClick={() => handleCategoryClick('Wearable Devices')}>
          <div className="drawer-button__menu-item__button-div">
            <i className="fa-solid fa-hand" />
            <h6>Wearable Devices</h6>
          </div>
          <i className="fa-solid fa-chevron-right" />
        </button>
      </li>
    </ul>
  );
}
