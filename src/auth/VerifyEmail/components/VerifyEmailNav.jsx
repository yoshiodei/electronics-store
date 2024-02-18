import React from 'react';
import appName from '../../../Constants/constantVariables';
import appLogo from '../../../assets/images/electrotossLogoWhite.png';

export default function VerifyEmailNav() {
  return (
    <nav id="page-top" className={false ? 'navbar-custom toggled' : 'navbar-custom'}>
      <div className="navbar-custom__top-div">
        <div className="navbar-custom__top-div__inner-div">
          <div className="navbar-custom__top-brand-div">
            <div className="navbar-custom__brand">
              <span>
                <img className="navbar-custom__app-logo" src={appLogo} alt={appName} />
              </span>
              <span className="h2 navbar-custom__brand-text">
                { appName }
              </span>
            </div>
            <p>Electronic Gadgets Marketplace</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
