import React from 'react';
import { Link } from 'react-router-dom';
import SellNowButton from '../components/SellNowButton';
import appName, { helpEmail, marketingAndPartnershipEmail } from '../Constants/constantVariables';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__top-div">
        <div className="row">
          <div className="col-md-3">
            <h4 className="footer__heading">{appName}</h4>
            <p className="footer__brand-info">{`Connect, Buy, and Sell Your Favorite Gadgets right here on ${appName}.`}</p>
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
            <h4 className="footer__heading">Contact Us</h4>
            {/* <div className="footer__contact-div d-flex">
              <i className="footer__contact-icon fa-solid fa-phone" />
              <p className="footer__contact-info">058-422-8123</p>
            </div> */}
            <h6 className="footer__sub-heading mb-3">Reach out to our help desk</h6>
            <div className="footer__contact-div d-flex">
              <i className="footer__contact-icon fa-solid fa-envelope" />
              <p className="footer__contact-info">{helpEmail}</p>
            </div>
            <h6 className="footer__sub-heading mb-3">For marketing and partnerships</h6>
            <div className="footer__contact-div d-flex">
              <i className="footer__contact-icon fa-solid fa-envelope" />
              <p className="footer__contact-info">{marketingAndPartnershipEmail}</p>
            </div>
            {/* <div className="footer__contact-div d-flex">
              <i className="footer__contact-icon fa-solid fa-location-dot" />
              <p className="footer__contact-info">Kingsford street, Auston, Texas</p>
            </div> */}
          </div>
          <div className="col-md-3">
            <h4 className="footer__heading">Follow Us</h4>
            <div className="footer__socials-div d-flex">
              <a href="https://web.facebook.com/electrotoss" target="_blank" rel="noreferrer" className="footer__socials-inner-div" title="facebook">
                <i className="footer__social-icon fa-brands fa-facebook-f" />
              </a>
              <a href="https://www.instagram.com/electrotoss" target="_blank" rel="noreferrer" className="footer__socials-inner-div" title="instagram">
                <i className="footer__social-icon fa-brands fa-instagram" />
              </a>
              <a href="https://twitter.com/electrotoss" target="_blank" rel="noreferrer" className="footer__socials-inner-div" title="twitter">
                <i className="footer__social-icon fa-brands fa-twitter" />
              </a>
              <a href="https://www.youtube.com/channel/UCUDgJq_u7d7A_i_2n6Ap-qg" target="_blank" rel="noreferrer" className="footer__socials-inner-div" title="youtube">
                <i className="footer__social-icon fa-brands fa-youtube" />
              </a>
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
