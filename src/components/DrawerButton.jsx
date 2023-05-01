import React from 'react';

export default function DrawerButton({ toggleDrawer, setToggleDrawer }) {
  return (
    <>
      <button type="button" className="drawer-button" onClick={() => setToggleDrawer(!toggleDrawer)}>
        <div className="drawer-button__line" />
        <div className="drawer-button__line" />
        <div className="drawer-button__line" />
      </button>
      <div className={toggleDrawer ? 'drawer-button__div' : 'drawer-button__div__hide'}>
        <div className="drawer-button__input-div">
          <input className="drawer-button__input" placeholder="Search item" />
          <button type="button" className="drawer-button__input-button">Search</button>
        </div>
        <div className="drawer-button__sign-in-div">
          <button type="button" className="drawer-button__sign-in-button">Sign In</button>
          <button type="button" className="drawer-button__register-button">Register</button>
        </div>
        <div className="drawer-button__menu-div">
          <h5>Profile Menu</h5>
          <ul>
            <li className="drawer-button__menu-item">
              <button type="button">
                <h6>my account</h6>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button">
                <h6>notifications</h6>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
          </ul>
        </div>
        <div className="drawer-button__menu-div">
          <h5>Categories</h5>
          <ul>
            <li className="drawer-button__menu-item">
              <button type="button">
                <h6>Phones</h6>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button">
                <h6>Television</h6>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button">
                <h6>Desktop</h6>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button">
                <h6>Laptop</h6>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button">
                <h6>Gaming Consoles</h6>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button">
                <h6>Headphones and Speakers</h6>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button">
                <h6>Accessories</h6>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
          </ul>
        </div>
        <div className="drawer-button__sign-out-div">
          <button type="button" className="drawer-button__sign-out-button">Sign Out</button>
        </div>
      </div>
    </>
  );
}
