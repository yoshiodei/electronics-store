import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Main from './Main';
import appName from '../../Constants/constantVariables';
import NavbarBottom from '../../components/NavbarBottom';

export default function NewShop() {
  return (
    <>
      <Helmet>
        <title>{`Create Shop | ${appName}`}</title>
        <meta
          name="description"
          content={`Your One-Stop Electronic Gadget Marketplace.
              Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/new-item" />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      <Footer />
    </>
  );
}
