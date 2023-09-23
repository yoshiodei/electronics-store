import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import guyPointingDown from '../assets/images/guyPointingDown.png';
import womanHoldingLaptop from '../assets/images/womanHoldingLaptop.png';
import SellNowButton from './SellNowButton';
import appName from '../Constants/constantVariables';

export default function Hero() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim().length > 0) {
      navigate(`/search/${search}`);
    }
  };

  return (
    <div className="hero hero-hidden">
      <div className="hero__main-div">
        <h1>Your One-Stop Electronic Gadget Marketplace.</h1>
        <p className="hero__text-large">
          {`Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        </p>
        <p className="hero__text-small">
          {`Discover the Best Deals right here on ${appName}.`}
        </p>
        <SellNowButton />
        <img src={womanHoldingLaptop} className="hero__main-div__image" alt="woman holding laptop" />
      </div>
      <div className="hero__search-div d-flex">
        <div className="hero__form">
          <form className="hero__form-element" onSubmit={handleSubmit}>
            <input className="hero__search-div__input" value={search} placeholder="What are you looking for?" onChange={(e) => setSearch(e.target.value)} />
            <button type="submit" className="hero__search-div__button">Search</button>
          </form>
        </div>
        <img src={guyPointingDown} className="hero__search-div__image" alt="guy pointing down" />
      </div>
    </div>
  );
}
