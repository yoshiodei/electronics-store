import React from 'react';
import SellNowButton from '../components/SellNowButton';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__top-div">
        <div className="row">
          <div className="col-md-3">
            <h4 className="footer__heading">Brand</h4>
            <p className="footer__brand-info">lorem ipsum imei ini dolor lehm suraj kan ini mei lahim sural kamal</p>
            <SellNowButton />
          </div>
          <div className="col-md-3">
            <h4 className="footer__heading">Categories</h4>
            <ul className="footer__category-list">
              <li className="footer__category-list-item">
                <a href="phone">Phones</a>
              </li>
              <li className="footer__category-list-item">
                <a href="phone">Television</a>
              </li>
              <li className="footer__category-list-item">
                <a href="phone">Desktop</a>
              </li>
              <li className="footer__category-list-item">
                <a href="phone">Laptops</a>
              </li>
              <li className="footer__category-list-item">
                <a href="phone">Gaming Consoles</a>
              </li>
              <li className="footer__category-list-item">
                <a href="phone">Headphones &amp; Speakers</a>
              </li>
              <li className="footer__category-list-item">
                <a href="phone">Accessories</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4 className="footer__heading ">Contact Us</h4>
            <div className="footer__contact-div d-flex">
              <i className="footer__contact-icon" />
              <p className="footer__contact-info">058-422-8123</p>
            </div>
            <div className="footer__contact-div d-flex">
              <i className="footer__contact-icon" />
              <p className="footer__contact-info">brand@email.co.us</p>
            </div>
            <div className="footer__contact-div d-flex">
              <i className="footer__contact-icon" />
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
