import React from 'react';
// import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../sections/Footer';
import Main from '../sections/HomeMain';

export default function Home() {
  return (
    <>
      <Navbar />
      <Main />
      <Footer />
      {/* <Link to="/search">Search Page</Link> */}
    </>
  );
}
