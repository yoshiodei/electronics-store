import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Main from './Main';
import appName from '../../Constants/constantVariables';
import NavbarBottom from '../../components/NavbarBottom';

export default function SearchResult() {
  const { searchName } = useParams();

  return (
    <>
      <Helmet>
        <title>{`Search | ${appName}`}</title>
        <meta
          name="description"
          content={`${appName} has got you covered. Here is a search result list for your search - ${searchName}`}
        />
        <link rel="canonical" href={`/search/${searchName}#page-top`} />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main searchName={searchName} />
      <Footer />
    </>
  );
}
