import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DrawerButton({ toggleDrawer, setToggleDrawer }) {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate('/search');
    setToggleDrawer(false);
  };

  const handleMenuButtonClick = (title) => {
    switch (title) {
      case 'my-account':
        navigate('/user-account');
        break;
      case 'notifications':
        navigate('/notifications');
        break;
      case 'wish-list':
        navigate('/wish-list');
        break;
      default:
        navigate('/');
        break;
    }

    setToggleDrawer(false);
  };

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
          <button type="button" className="drawer-button__sign-in-button" data-bs-toggle="modal" data-bs-target="#SignInModal">Sign In</button>
          <button type="button" className="drawer-button__register-button" data-bs-toggle="modal" data-bs-target="#SignUpModal">Register</button>
        </div>
        <div className="drawer-button__menu-div">
          <h5>Profile Menu</h5>
          <ul>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={() => handleMenuButtonClick('my-account')}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-user" />
                  <h6>my account</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={() => handleMenuButtonClick('notifications')}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-bell" />
                  <h6>notifications</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={() => handleMenuButtonClick('wish-list')}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-heart" />
                  <h6>wish list</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
          </ul>
        </div>
        <div className="drawer-button__menu-div">
          <h5>Categories</h5>
          <ul>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={handleCategoryClick}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-mobile" />
                  <h6>phones</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={handleCategoryClick}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-tv" />
                  <h6>televisions</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={handleCategoryClick}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-desktop" />
                  <h6>desktops</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={handleCategoryClick}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-laptop" />
                  <h6>laptops</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={handleCategoryClick}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-gamepad" />
                  <h6>gaming consoles</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={handleCategoryClick}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-headphones" />
                  <h6>headphones and speakers</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
            <li className="drawer-button__menu-item">
              <button type="button" onClick={handleCategoryClick}>
                <div className="drawer-button__menu-item__button-div">
                  <i className="fa-solid fa-puzzle-piece" />
                  <h6>accessories</h6>
                </div>
                <i className="fa-solid fa-chevron-right" />
              </button>
            </li>
          </ul>
        </div>
        <div className="drawer-button__sign-out-div">
          <button type="button" className="drawer-button__sign-out-button" onClick={() => handleMenuButtonClick('')}>Sign Out</button>
        </div>
      </div>
    </>
  );
}
