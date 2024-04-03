import React from 'react';
import { Link } from 'react-router-dom';
import appName from '../../Constants/constantVariables';
import appLogo from '../../assets/images/nudianceImages/nudiance log with type.png';

export default function AuthNav() {
  return (
    <nav id="page-top" className={false ? 'navbar-custom toggled' : 'navbar-custom'}>
      <div className="navbar-custom__top-div alt">
        <div className="navbar-custom__top-div__inner-div">
          <div className="navbar-custom__top-brand-div">
            <Link to="/" className="navbar-custom__brand">
              <span>
                <img className="footer__app-logo" src={appLogo} alt={appName} style={{ width: '70px', height: '55px' }} />
              </span>
              {/* <span className="h2 navbar-custom__brand-text alt">
                { appName }
              </span> */}
            </Link>
            <p>Your Marketplace for Vehicles and Electronic Gadgets</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
