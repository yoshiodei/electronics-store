import React from 'react';
import Navbar from '../../components/Navbar';
import NavbarBottom from '../../components/NavbarBottom';
import Main from './Main';
import AuthFooter from '../../auth/components/AuthFooter';

export default function ItemRequestList() {
  return (
    <>
      <Navbar />
      <NavbarBottom />
      <Main />
      <AuthFooter />
    </>
  );
}
