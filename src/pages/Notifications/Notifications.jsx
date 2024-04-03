import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import { selectAuthState } from '../../redux/slice/authSlice';
import Main from './Main';
import appName from '../../Constants/constantVariables';
import NavbarBottom from '../../components/NavbarBottom';

export default function Notifications() {
  const { loginInfo } = useSelector(selectAuthState);
  const { isAnonymous, uid } = loginInfo;

  const navigate = useNavigate();
  useEffect(() => {
    if (isAnonymous) {
      navigate('/');
      toast.error('Access Denied: Unauthorized Page', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Notifications | ${appName}`}</title>
        <meta
          name="description"
          content={`Your Marketplace for Vehicles and Electronic Gadgets.
          Discover the Best Deals, Connect with Sellers, and Trade with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/notifications" />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main uid={uid} />
      <Footer />
    </>
  );
}
