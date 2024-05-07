import React from 'react';
import Navbar from '../../components/Navbar';
import NavbarBottom from '../../components/NavbarBottom';
import AuthFooter from '../../auth/components/AuthFooter';
import Main from './Main';

export default function SingleItemRequest() {
  return (
    <>
      <Navbar />
      <NavbarBottom />
      <Main />
      <AuthFooter />
    </>
  );
}
