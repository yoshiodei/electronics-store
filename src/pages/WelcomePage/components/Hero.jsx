import React from 'react';
import appName from '../../../Constants/constantVariables';

export default function Hero() {
  return (
    <div className="welcome-page__hero">
      <div className="welcome-page__hero__main-div">
        <h1>Your One-Stop Electronic Gadget Marketplace.</h1>
        <p className="welcome-page__hero__text-large">
          {`Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        </p>
        <p className="welcome-page__hero__text-small">
          {`Discover the Best Deals right here on ${appName}.`}
        </p>
      </div>
    </div>
  );
}
