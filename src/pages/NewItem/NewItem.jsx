import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Main from './Main';
import { selectAuthState } from '../../redux/slice/authSlice';
import appName from '../../Constants/constantVariables';

export default function NewItem() {
  const { login: isAnonymous, userInfo: emailVerified } = useSelector(selectAuthState);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAnonymous || !emailVerified) {
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
        <title>{`New Item | ${appName}`}</title>
        <meta
          name="description"
          content={`Your One-Stop Electronic Gadget Marketplace.
          Discover the Best Deals, Connect with Sellers, and Trade Gadgets with Ease right here on ${appName}.`}
        />
        <link rel="canonical" href="/new-item" />
      </Helmet>
      <Navbar />
      <Main />
      <Footer />
    </>
  );
}
