/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import SellNowButton from '../components/SellNowButton';
import appName, { helpEmail, marketingAndPartnershipEmail } from '../Constants/constantVariables';
import appLogo from '../assets/images/electrotossLogoWhite.png';

export default function Footer() {
  const handleEmailClick = (emailAddress) => {
    const subject = `Hello from ${appName}!`;
    const body = 'Write your message here.';

    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const emailWindow = window.open(mailtoLink, '_blank');
    emailWindow.opener = null; // Prevent the opened window from accessing the current window
  };

  return (
    <div className="footer">
      <div className="footer__top-div">
        <div className="row">
          <div className="col-md-4">
            <Link to="/" className="footer__brand">
              <span>
                <img className="footer__app-logo" src={appLogo} alt={appName} />
              </span>
              <h4 className="footer__heading">
                { appName }
              </h4>
            </Link>
            <p className="footer__brand-info">{`Connect, Buy, and Sell Your Favorite Gadgets right here on ${appName}.`}</p>
            <SellNowButton />
            <div className="footer__info-div">
              <div className="footer__info">
                <Link to="/termsAndConditions">Terms and Conditions</Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h4 className="footer__heading">Categories</h4>
            <ul className="footer__category-list">
              <li className="footer__category-list-item">
                <Link to="/category/Computers & Tablets">Computers &amp; Tablets</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/Video Games & Consoles">Video Games &amp; Consoles</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/Audio & Headphones">Audio &amp; Headphones</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/Office Electronics">Office Electronics</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/Wearable Devices">Wearable Devices</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/Car Electronics">Car Electronics</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/Cameras, Drones & Accessories">Cameras, Drones &amp; Accessories</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/Home Appliances">Home Appliances</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/Cellphones & Accessories">Cellphones & Accessories</Link>
              </li>
              <li className="footer__category-list-item">
                <Link to="/category/Televisions">Televisions</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className="footer__heading">Contact Us</h4>

            <h6 className="footer__sub-heading mb-3">Reach out to our help desk</h6>
            <div className="footer__contact-div d-flex" role="button" onClick={() => handleEmailClick({ helpEmail })}>
              <i className="footer__contact-icon fa-solid fa-envelope" />
              <p className="footer__contact-info">{helpEmail}</p>
            </div>
            <h6 className="footer__sub-heading mb-3">For marketing and partnerships</h6>
            <div className="footer__contact-div d-flex" role="button" onClick={() => handleEmailClick({ marketingAndPartnershipEmail })}>
              <i className="footer__contact-icon fa-solid fa-envelope" />
              <p className="footer__contact-info">{marketingAndPartnershipEmail}</p>
            </div>

          </div>
          <div className="col-md-4">
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
