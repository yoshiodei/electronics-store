import React from 'react';
import { Helmet } from 'react-helmet-async';
import appName from '../../Constants/constantVariables';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Main from './Main';

export default function MobileSettings() {
  return (
    <>
      <Helmet>
        <title>{`Chat List | ${appName}`}</title>
        <meta
          name="description"
          content={`Your One-Stop Electronic Gadget Marketplace.
                  Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/chatlist/mobile" />
      </Helmet>
      <Navbar />
      <Main />
      <Footer />
    </>
  );
}
