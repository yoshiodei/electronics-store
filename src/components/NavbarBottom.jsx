import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appName from '../Constants/constantVariables';
import appLogo from '../assets/images/nudianceImages/nudiance log with type.png';

export default function NavbarBottom() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      const triggerHeight = 50;

      setIsScrolled(scrollHeight > triggerHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrolled]);

  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (search.trim().length > 0) {
      navigate(`/search/${search}`);
      setSearch('');
    }
  };

  return (
    <div className={`bottom-nav ${isScrolled ? 'bottom-nav--scrolled' : ''}`}>
      <div className="bottom-nav__content">
        <div className="navbar-custom__top-brand-div">
          <Link to="/" className="navbar-custom__brand">
            <span>
              <img className="navbar-custom__app-logo" src={appLogo} alt={appName} style={{ width: '70px', height: '55px' }} />
            </span>
            {/* <span className="h2 navbar-custom__brand-text">
              { appName }
            </span> */}
          </Link>
          <p style={{ fontSize: '11px' }}>Your Marketplace for Vehicles and Electronic Gadgets</p>
        </div>
        <div className="bottom-nav__content-search-div">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="What are you looking for"
          />
          <button
            className="bottom-nav__content-search-button"
            type="button"
            onClick={handleSubmit}
          >
            <i className="fa-solid fa-magnifying-glass" />
          </button>
        </div>
        <Link to="/" className="bottom-nav__home-icon-link">
          <i className="fa-solid fa-house" />
          <h6>Home</h6>
        </Link>
      </div>
    </div>
  );
}
