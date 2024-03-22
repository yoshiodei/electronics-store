/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// import Footer from '../../sections/Footer';
import Main from './Main';
import Navbar from '../../components/Navbar';
import NavbarBottom from '../../components/NavbarBottom';
import AuthFooter from '../../auth/components/AuthFooter';

export default function WelcomePage() {
  return (
    <>
      <Navbar />
      <NavbarBottom />
      <Main />
      {/* <Footer /> */}
      <AuthFooter />
    </>
  );
}
