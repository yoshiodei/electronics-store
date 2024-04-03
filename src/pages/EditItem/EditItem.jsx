import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
// import Footer from '../../sections/Footer';
import Main from './Main';
import appName from '../../Constants/constantVariables';
import NavbarBottom from '../../components/NavbarBottom';
import AuthFooter from '../../auth/components/AuthFooter';

export default function EditItem() {
  return (
    <>
      <Helmet>
        <title>{`Edit Item | ${appName}`}</title>
        <meta
          name="description"
          content={`Your Marketplace for Vehicles and Electronic Gadgets.
          Discover the Best Deals, Connect with Sellers, and Trade with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/new-item" />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      {/* <Footer /> */}
      <AuthFooter />
    </>
  );
}
