import React from 'react';
import guyPointingDown from '../assets/images/guyPointingDown.png';
import womanHoldingLaptop from '../assets/images/womanHoldingLaptop.png';
import SellNowButton from './SellNowButton';

export default function Hero() {
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
          <form>
            <input className="hero__search-div__input" placeholder="What are you looking for?" />
            <button type="button" className="hero__search-div__button">Search</button>
          </form>
        </div>
        <img src={guyPointingDown} className="hero__search-div__image" alt="guy pointing down" />
      </div>
    </div>
  );
}
