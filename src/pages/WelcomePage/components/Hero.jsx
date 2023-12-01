import React from 'react';
import appName from '../../../Constants/constantVariables';
import NewArrivals from './NewArrivals';
import image from '../../../assets/images/womanHoldingLaptop.png';
import imageBG from '../../../assets/images/imageBackground.png';

export default function Hero() {
  return (
    <div className="welcome-page__hero">
      <div className="welcome-page__hero__main-div">
        <h1>
          Experience Innovation at Your Fingertips! Elevate Your Lifestyle with the Latest
          {' '}
          in Electronic Gadgets.
        </h1>
        <p className="welcome-page__hero__text-large">
          {`Unleash the Power of Possibilities with the Latest Electronic Gadgets right here at ${appName}.`}
        </p>
        <p className="welcome-page__hero__text-small">
          {`Unleash the Power of Possibilities with the Latest Electronic Gadgets right here at ${appName}.`}
        </p>
        <NewArrivals />
        <div className="welcome-page__hero__image-div">
          <img src={image} alt="img" className="welcome-page__hero__image" />
          <img src={imageBG} alt="imgBG" className="welcome-page__hero__image-BG" />
        </div>
      </div>
    </div>
  );
}
