import React from 'react';
import { Helmet } from 'react-helmet-async';
import appName from '../../Constants/constantVariables';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Main from './Main';
import NavbarBottom from '../../components/NavbarBottom';

export default function NewArrivals() {
  return (
    <>
      <Helmet>
        <title>{`New Arrivals | ${appName}`}</title>
        <meta
          name="description"
          content={`Your One-Stop Electronic Gadget Marketplace.
          Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/new-arrivals" />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      <Footer />
    </>
  );
}
