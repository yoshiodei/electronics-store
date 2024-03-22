import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { selectAuthState } from '../../redux/slice/authSlice';
import Navbar from '../../components/Navbar';
// import Footer from '../../sections/Footer';
import Main from './Main';
import appName from '../../Constants/constantVariables';
import NavbarBottom from '../../components/NavbarBottom';
import AuthFooter from '../../auth/components/AuthFooter';

export default function ChatRoom() {
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
        <title>{`Chat Room | ${appName}`}</title>
        <meta
          name="description"
          content={`You can easy interact with buyers and sellers in our in built chat system right here on ${appName}`}
        />
        <link rel="canonical" href="/chat-room" />
      </Helmet>
      <Navbar />
      <NavbarBottom />
      <Main uid={uid} />
      {/* <Footer /> */}
      <AuthFooter />
    </>
  );
}
