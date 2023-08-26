import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Main from './Main';
import appName from '../../Constants/constantVariables';

export default function Home() {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>{`Single Item | ${appName}`}</title>
        <meta
          name="description"
          content={`Your One-Stop Electronic Gadget Marketplace.
          Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href={`/single-item/${id}`} />
      </Helmet>
      <Navbar />
      <Main />
      <Footer />
    </>
  );
}
