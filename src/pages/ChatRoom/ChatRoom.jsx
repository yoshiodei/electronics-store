import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectAuthState } from '../../redux/slice/authSlice';
import Navbar from '../../components/Navbar';
import Footer from '../../sections/Footer';
import Main from './Main';

export default function ChatRoom() {
  const { userId } = useSelector(selectAuthState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
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
      <Navbar />
      <Main />
      <Footer />
    </>
  );
}
