import React from 'react';
import { Link } from 'react-router-dom';
import appName from '../../Constants/constantVariables';
import appLogo from '../../assets/images/electrotossLogoWhite.png';

export default function AuthFooter() {
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
          </div>
        </div>
      </div>
      <div className="footer__bottom-div d-flex">
        <h6>Copyright 2023</h6>
      </div>
    </div>
  );
}
