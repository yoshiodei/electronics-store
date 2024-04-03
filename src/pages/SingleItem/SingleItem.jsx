import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Main from './Main';
import appName from '../../Constants/constantVariables';
import useSetViews from './hooks/useSetViews';
import NavbarBottom from '../../components/NavbarBottom';

export default function Home() {
  const { id } = useParams();
  useSetViews();

  return (
    <>
      <Helmet>
        <title>{`Single Item | ${appName}`}</title>
        <meta
          name="description"
          content={`Your Marketplace for Vehicles and Electronic Gadgets.
          Discover the Best Deals, Connect with Sellers, and Trade with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href={`/single-item/${id}`} />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main />
      <Footer />
    </>
  );
}
