import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import guyPointingDown from '../assets/images/guyPointingDown.png';
import womanHoldingLaptop from '../assets/images/womanHoldingLaptop.png';
import SellNowButton from './SellNowButton';

export default function Hero() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };

  return (
    <div className="hero">
      <div className="hero__main-div">
        <h1>Lorem ipsum imei dolor ini kalam ilaan yaman.</h1>
        <p>Find all the latest and trending electronic products right here.</p>
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
