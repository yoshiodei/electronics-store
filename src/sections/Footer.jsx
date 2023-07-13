import React from 'react';
import { Link } from 'react-router-dom';
import SellNowButton from '../components/SellNowButton';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__top-div">
        <div className="row">
          <div className="col-md-3">
            <h4 className="footer__heading">Tektoss</h4>
            <p className="footer__brand-info">Connect, Buy, and Sell Your Favorite Gadgets right here on Tektoss.</p>
            <SellNowButton />
          </div>
          <div className="col-md-3">
            <h4 className="footer__heading">Categories</h4>
            <ul className="footer__category-list">
              <li className="footer__category-list-item">
                <Link to="/category/phones">Phones</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/televisions">Televisions</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/desktops">Desktops</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/laptops">Laptops</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/game consoles">Game Consoles</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/headphones and speakers">Headphones and Speakers</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/accessories">Accessories</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4 className="footer__heading ">Contact Us</h4>
            <div className="footer__contact-div d-flex">
              <i className="footer__contact-icon fa-solid fa-phone" />
              <p className="footer__contact-info">058-422-8123</p>
            </div>
            <div className="footer__contact-div d-flex">
              <i className="footer__contact-icon fa-solid fa-envelope" />
              <p className="footer__contact-info">brand@email.co.us</p>
            </div>
            <div className="footer__contact-div d-flex">
              <i className="footer__contact-icon fa-solid fa-location-dot" />
              <p className="footer__contact-info">Kingsford street, Auston, Texas</p>
            </div>
          </div>
          <div className="col-md-3">
            <h4 className="footer__heading">Follow Us</h4>
            <div className="footer__socials-div d-flex">
              <div className="footer__socials-inner-div">
                <i className="footer__social-icon fa-brands fa-facebook-f" />
              </div>
              <div className="footer__socials-inner-div">
                <i className="footer__social-icon fa-brands fa-instagram" />
              </div>
              <div className="footer__socials-inner-div">
                <i className="footer__social-icon fa-brands fa-twitter" />
              </div>
              <div className="footer__socials-inner-div">
                <i className="footer__social-icon fa-brands fa-youtube" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom-div d-flex">
        <h6>Copyright 2023</h6>
      </div>
    </div>
  );
}
