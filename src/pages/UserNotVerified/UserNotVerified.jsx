import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Main from './Main';
import appName from '../../Constants/constantVariables';

export default function UserNotVerified() {
  return (
    <>
      <Helmet>
        <title>{`Verify Email | ${appName}`}</title>
        <meta
          name="description"
          content={`Your One-Stop Electronic Gadget Marketplace.
          Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/verify-user" />
      </Helmet>
      <Navbar />
      <Main />
      <Footer />
    </>
  );
}
